import { serverEnv } from "@/lib/env";
import Stripe from "stripe";
import { z } from "zod";

// Initialize Stripe client with proper configuration (server-side only)
export function createStripeClient(): Stripe | null {
  const server = serverEnv();

  if (!server.STRIPE_SECRET_KEY) {
    console.error("Stripe secret key not configured");
    return null;
  }

  return new Stripe(server.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  });
}

import { SubscriptionPlanIdSchema } from "./types";

// Client-side subscription plans (safe to expose)
export const SUBSCRIPTION_PLANS: Record<
  z.infer<typeof SubscriptionPlanIdSchema>,
  {
    id: z.infer<typeof SubscriptionPlanIdSchema>;
    name: string;
    description: string;
    price: string;
    interval: string;
    features: string[];
  }
> = {
  pro: {
    id: "pro",
    name: "Pro",
    description: "Access to all premium features",
    price: "$9.99",
    interval: "month",
    features: [
      "Advanced Analytics",
      "Priority Support",
      "Unlimited Projects",
      "Advanced Integrations",
      "Early Access to New Features",
    ],
  },
  // Add more plans here as needed
  // enterprise: {
  //   id: "enterprise",
  //   name: "Enterprise",
  //   description: "Enterprise-grade features for teams",
  //   price: "$29.99",
  //   interval: "month",
  //   features: [...],
  // },
} as const;

// Get plan price ID by plan ID (server-side only)
export function getPlanPriceId(
  planId: z.infer<typeof SubscriptionPlanIdSchema>,
) {
  const server = serverEnv();

  const serverPlans: Record<
    z.infer<typeof SubscriptionPlanIdSchema>,
    { priceId: string | undefined }
  > = {
    pro: { priceId: server.NEXT_PUBLIC_STRIPE_PRICE_ID },
    // Add more plans here as needed
    // enterprise: {
    //   priceId: server.STRIPE_ENTERPRISE_PRICE_ID, // Server-only env var
    // },
  };

  return serverPlans[planId]?.priceId;
}
