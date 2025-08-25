import { env, serverEnv } from "@/lib/env";
import Stripe from "stripe";

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  pro: {
    name: "Pro",
    description: "Access to all premium features",
    // Use appropriate env based on context
    priceId: (typeof window === "undefined" ? serverEnv() : env).NEXT_PUBLIC_STRIPE_PRICE_ID || "price_1234567890",
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
  // enterprise: { ... }
} as const;

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

// Get the default subscription plan
export function getDefaultPlan() {
  return SUBSCRIPTION_PLANS.pro;
}
