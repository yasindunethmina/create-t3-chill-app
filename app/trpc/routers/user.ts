import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
  subscribedProcedure,
} from "../init";

export const userRouter = createTRPCRouter({
  // Test procedures
  hello: publicProcedure.query(() => {
    return {
      greeting: "hello",
    };
  }),

  // User procedures
  getProfile: authenticatedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: { id: ctx.user.id },
      include: {
        subscription: true,
      },
    });
    return profile;
  }),

  // Example: Subscription-only features (requires active subscription)
  getProFeatures: subscribedProcedure.query(async ({ ctx }) => {
    return {
      message:
        "🎉 Your subscription details have been added! If the 'stripeSubscriptionId' or 'stripePriceId' columns are still null in your database, make sure you've run the Stripe CLI and completed all setup steps. Refer to the setup guide for troubleshooting.",
      features: [
        "Advanced Analytics",
        "Priority Support",
        "Unlimited Projects",
        "Advanced Integrations",
      ],
      subscription: ctx.subscription,
    };
  }),
});
