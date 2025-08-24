import Stripe from "stripe";

// Stripe configuration and validation
export const STRIPE_CONFIG = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
} as const;

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  pro: {
    name: "Pro",
    description: "Access to all premium features",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_1234567890",
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

// Validate Stripe configuration
export function validateStripeConfig(): {
  isValid: boolean;
  missingKeys: string[];
} {
  const requiredKeys = [
    { key: "STRIPE_SECRET_KEY", value: STRIPE_CONFIG.secretKey },
    {
      key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      value: STRIPE_CONFIG.publishableKey,
    },
    { key: "STRIPE_WEBHOOK_SECRET", value: STRIPE_CONFIG.webhookSecret },
    {
      key: "NEXT_PUBLIC_STRIPE_PRICE_ID",
      value: SUBSCRIPTION_PLANS.pro.priceId,
    },
  ];

  const missingKeys = requiredKeys
    .filter(({ value }) => !value || value === "price_1234567890")
    .map(({ key }) => key);

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
}

// Initialize Stripe client with proper configuration
export function createStripeClient(): Stripe | null {
  if (!STRIPE_CONFIG.secretKey) {
    console.error("Stripe secret key not configured");
    return null;
  }

  return new Stripe(STRIPE_CONFIG.secretKey, {
    apiVersion: "2025-07-30.basil",
  });
}

// Check if Stripe is enabled and properly configured
export function isStripeEnabled(): boolean {
  return validateStripeConfig().isValid;
}

// Get the default subscription plan
export function getDefaultPlan() {
  return SUBSCRIPTION_PLANS.pro;
}
