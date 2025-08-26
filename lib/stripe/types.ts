import { z } from "zod";

// Type for plan IDs (references the comprehensive plan definitions from Stripe)
export const SubscriptionPlanIdSchema = z.enum(["pro"]);

// Subscription Status Types
export type SubscriptionStatusT =
  | "ACTIVE"
  | "CANCELED"
  | "INCOMPLETE"
  | "INCOMPLETE_EXPIRED"
  | "PAST_DUE"
  | "TRIALING"
  | "UNPAID"
  | "INACTIVE";

// Subscription Data Structure
export type SubscriptionDataT = {
  isSubscribed: boolean;
  status: SubscriptionStatusT;
  currentPeriodEnd: Date | undefined;
  stripeEnabled: boolean;
};

// Checkout Session Options
export type CreateCheckoutOptionsT = {
  planId: z.infer<typeof SubscriptionPlanIdSchema>;
  returnTo?: string;
  type?: "subscription";
};

// Checkout Session Result
export type CheckoutSessionResultT = {
  url: string | null;
};

// Stripe Verify Result
export type StripeVerifyResultT =
  | { success: boolean; alreadyActive: boolean; recovered?: undefined }
  | { success: boolean; recovered: boolean; alreadyActive?: undefined };
