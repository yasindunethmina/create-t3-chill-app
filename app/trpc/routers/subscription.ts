import { env, isStripeConfigured } from "@/lib/env";
import { createStripeClient, getPlanPriceId } from "@/lib/stripe/stripe";
import { SubscriptionPlanIdSchema } from "@/lib/stripe/types";
import { z } from "zod";
import { authenticatedProcedure, createTRPCRouter } from "../init";

export const subscriptionRouter = createTRPCRouter({
  getSubscriptionStatus: authenticatedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: { subscription: true },
    });

    const status = user?.subscription?.status || "INACTIVE";
    const isSubscribed = status === "ACTIVE" || status === "TRIALING";

    return {
      isSubscribed,
      status,
      currentPeriodEnd: user?.subscription?.currentPeriodEnd,
      stripeEnabled: isStripeConfigured(),
    };
  }),

  createCheckoutSession: authenticatedProcedure
    .input(
      z.object({
        planId: SubscriptionPlanIdSchema,
        returnTo: z.string().startsWith("/").default("/dashboard"),
        type: z.enum(["subscription"]).default("subscription"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!isStripeConfigured()) {
        throw new Error(
          "Stripe is not properly configured. Please check your environment variables.",
        );
      }

      const stripe = createStripeClient();
      if (!stripe) {
        throw new Error("Failed to initialize Stripe client");
      }

      const priceId = getPlanPriceId(input.planId);
      if (!priceId) {
        throw new Error("Invalid plan selected");
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
        include: { subscription: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if user already has an active subscription
      if (
        user.subscription?.status === "ACTIVE" ||
        user.subscription?.status === "TRIALING"
      ) {
        throw new Error("User already has an active subscription");
      }

      let customerId = user.subscription?.stripeCustomerId;

      // Create Stripe customer if doesn't exist
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: {
            userId: user.id,
          },
        });
        customerId = customer.id;

        // Update or create subscription record
        await ctx.prisma.subscription.upsert({
          where: { userId: user.id },
          update: { stripeCustomerId: customerId },
          create: {
            userId: user.id,
            stripeCustomerId: customerId,
            status: "INACTIVE",
          },
        });
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${
          env.NEXT_PUBLIC_APP_URL
        }/redirect?session_id={CHECKOUT_SESSION_ID}&type=${encodeURIComponent(
          input.type,
        )}&return_to=${encodeURIComponent(input.returnTo)}`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}${input.returnTo}`,
        metadata: {
          userId: user.id,
          planId: input.planId,
        },
      });

      return { url: session.url };
    }),

  verifyCheckoutSession: authenticatedProcedure
    .input(
      z.object({
        sessionId: z.string().min(1, "Session ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!isStripeConfigured()) {
        throw new Error("Stripe is not properly configured");
      }

      const stripe = createStripeClient();
      if (!stripe) {
        throw new Error("Failed to initialize Stripe client");
      }

      try {
        const session = await stripe.checkout.sessions.retrieve(
          input.sessionId,
        );

        // Verify session belongs to current user
        if (!session.customer || session.metadata?.userId !== ctx.user.id) {
          throw new Error("Session does not belong to current user");
        }

        // Check current subscription status
        const existingSubscription = await ctx.prisma.subscription.findUnique({
          where: { userId: ctx.user.id },
        });

        // If already active, webhook worked
        if (
          existingSubscription?.status === "ACTIVE" ||
          existingSubscription?.status === "TRIALING"
        ) {
          return { success: true, alreadyActive: true };
        }

        // If payment completed but subscription not active, update it
        if (
          session.payment_status === "paid" &&
          session.status === "complete"
        ) {
          await ctx.prisma.subscription.upsert({
            where: { userId: ctx.user.id },
            update: {
              status: "ACTIVE",
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              updatedAt: new Date(),
            },
            create: {
              userId: ctx.user.id,
              status: "ACTIVE",
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            },
          });

          return { success: true, recovered: true };
        }

        throw new Error("Payment not completed");
      } catch (error) {
        console.error("Error verifying checkout session:", error);
        throw new Error(
          error instanceof Error ? error.message : "Verification failed",
        );
      }
    }),
});
