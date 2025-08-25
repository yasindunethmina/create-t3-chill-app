import { serverEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createStripeClient } from "@/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = createStripeClient();
const endpointSecret = serverEnv().STRIPE_WEBHOOK_SECRET;

const statusMapping = {
  active: "ACTIVE",
  canceled: "CANCELED",
  incomplete: "INCOMPLETE",
  incomplete_expired: "INCOMPLETE_EXPIRED",
  past_due: "PAST_DUE",
  trialing: "TRIALING",
  unpaid: "UNPAID",
} as const;

// Type-safe interface for Stripe subscription with period data
type StripeSubscriptionWithPeriods = Stripe.Subscription & {
  current_period_start: number;
  current_period_end: number;
};

// Type-safe interface for Stripe invoice with subscription
type StripeInvoiceWithSubscription = Stripe.Invoice & {
  subscription?: string;
};

async function handleSubscriptionUpdate(
  subscription: StripeSubscriptionWithPeriods,
) {
  const customerId = subscription.customer as string;

  // Find profile by Stripe customer ID
  const profile = await prisma.profile.findFirst({
    where: {
      subscription: {
        stripeCustomerId: customerId,
      },
    },
    include: {
      subscription: true,
    },
  });

  if (!profile) {
    console.error("Profile not found for customer:", customerId);
    return;
  }

  const mappedStatus =
    statusMapping[subscription.status as keyof typeof statusMapping] ||
    "INACTIVE";

  // Update subscription in database
  await prisma.subscription.upsert({
    where: { userId: profile.id },
    update: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id,
      status: mappedStatus as
        | "ACTIVE"
        | "CANCELED"
        | "INCOMPLETE"
        | "INCOMPLETE_EXPIRED"
        | "PAST_DUE"
        | "TRIALING"
        | "UNPAID"
        | "INACTIVE",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
    create: {
      userId: profile.id,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id,
      status: mappedStatus as
        | "ACTIVE"
        | "CANCELED"
        | "INCOMPLETE"
        | "INCOMPLETE_EXPIRED"
        | "PAST_DUE"
        | "TRIALING"
        | "UNPAID"
        | "INACTIVE",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });

  console.log(
    `Updated subscription for profile ${profile.id}: ${mappedStatus}`,
  );
}

async function handleSubscriptionCancellation(
  subscription: Stripe.Subscription,
) {
  const customerId = subscription.customer as string;

  const profile = await prisma.profile.findFirst({
    where: {
      subscription: {
        stripeCustomerId: customerId,
      },
    },
  });

  if (!profile) {
    console.error("Profile not found for customer:", customerId);
    return;
  }

  await prisma.subscription.update({
    where: { userId: profile.id },
    data: {
      status: "CANCELED",
    },
  });

  console.log(`Canceled subscription for profile ${profile.id}`);
}

const eventHandlers: Record<string, (event: Stripe.Event) => Promise<void>> = {
  "customer.subscription.created": async (event) =>
    handleSubscriptionUpdate(
      event.data.object as StripeSubscriptionWithPeriods,
    ),
  "customer.subscription.updated": async (event) =>
    handleSubscriptionUpdate(
      event.data.object as StripeSubscriptionWithPeriods,
    ),
  "customer.subscription.deleted": async (event) =>
    handleSubscriptionCancellation(event.data.object as Stripe.Subscription),
  "invoice.payment_succeeded": async (event) => {
    const invoice = event.data.object as StripeInvoiceWithSubscription;
    const subscriptionId = invoice.subscription;
    if (subscriptionId && stripe) {
      try {
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        await handleSubscriptionUpdate(
          subscription as unknown as StripeSubscriptionWithPeriods,
        );
      } catch (error) {
        console.error("Error retrieving subscription for invoice:", error);
      }
    }
  },
  "invoice.payment_failed": async (event) => {
    const invoice = event.data.object as StripeInvoiceWithSubscription;
    const subscriptionId = invoice.subscription;
    if (subscriptionId && stripe) {
      try {
        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        await handleSubscriptionUpdate(
          subscription as unknown as StripeSubscriptionWithPeriods,
        );
      } catch (error) {
        console.error("Error retrieving subscription for invoice:", error);
      }
    }
  },
};

export async function POST(req: NextRequest) {
  // Check if Stripe is properly configured
  if (!stripe || !endpointSecret) {
    console.error("Stripe environment variables not configured");
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 },
    );
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("Missing Stripe signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const handler = eventHandlers[event.type];
    if (handler) {
      await handler(event);
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
