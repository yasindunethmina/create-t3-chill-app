"use client";

import { trpcClient } from "@/app/trpc/client";
import { useMemo } from "react";

export type SubscriptionStatusT =
  | "ACTIVE"
  | "CANCELED"
  | "INCOMPLETE"
  | "INCOMPLETE_EXPIRED"
  | "PAST_DUE"
  | "TRIALING"
  | "UNPAID"
  | "INACTIVE";

export type UseSubscriptionReturnT = {
  // Status checks
  isSubscribed: boolean;
  isActive: boolean;
  isCanceled: boolean;
  isPastDue: boolean;
  isTrialing: boolean;
  isInactive: boolean;

  // Raw data
  status: SubscriptionStatusT | undefined;
  currentPeriodEnd: Date | undefined;
  stripeEnabled: boolean;

  // Loading states
  isLoading: boolean;
  error: unknown;

  // Utilities
  statusLabel: string;
  isValidSubscription: boolean;
  daysUntilExpiry: number | undefined;

  // Actions
  createCheckoutSession: (options?: {
    priceId?: string;
    returnTo?: string;
    type?: string;
  }) => Promise<{ url: string | null }>;
  isCreatingCheckout: boolean;

  // Refetch function
  refetch: () => void;
};

/**
 * Custom hook for managing subscription state and actions
 * Provides a clean interface without needing to check status === 'ACTIVE' etc.
 */
export function useSubscription(): UseSubscriptionReturnT {
  const {
    data: subscriptionData,
    isLoading,
    error,
    refetch,
  } = trpcClient.subscription.getSubscriptionStatus.useQuery();

  const createCheckoutMutation = trpcClient.subscription.createCheckoutSession.useMutation();

  const computedValues = useMemo(() => {
    const status = subscriptionData?.status as SubscriptionStatusT | undefined;
    const isSubscribed = subscriptionData?.isSubscribed ?? false;
    const stripeEnabled = subscriptionData?.stripeEnabled ?? false;
    const currentPeriodEnd = subscriptionData?.currentPeriodEnd
      ? new Date(subscriptionData.currentPeriodEnd)
      : undefined;

    // Status checks
    const isActive = status === "ACTIVE";
    const isCanceled = status === "CANCELED";
    const isPastDue = status === "PAST_DUE";
    const isTrialing = status === "TRIALING";
    const isInactive = status === "INACTIVE";

    // Valid subscription means user has access (active or trialing)
    const isValidSubscription = isActive || isTrialing;

    // Human-readable status label
    const statusLabel = (() => {
      switch (status) {
        case "ACTIVE":
          return "Active";
        case "CANCELED":
          return "Canceled";
        case "INCOMPLETE":
          return "Incomplete";
        case "INCOMPLETE_EXPIRED":
          return "Incomplete (Expired)";
        case "PAST_DUE":
          return "Past Due";
        case "TRIALING":
          return "Trial";
        case "UNPAID":
          return "Unpaid";
        case "INACTIVE":
          return "Inactive";
        default:
          return "Unknown";
      }
    })();

    // Days until expiry calculation
    const daysUntilExpiry = currentPeriodEnd
      ? Math.ceil(
          (currentPeriodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        )
      : undefined;

    return {
      isSubscribed,
      isActive,
      isCanceled,
      isPastDue,
      isTrialing,
      isInactive,
      status,
      currentPeriodEnd,
      stripeEnabled,
      statusLabel,
      isValidSubscription,
      daysUntilExpiry,
    };
  }, [subscriptionData]);

  const createCheckoutSession = async (options?: {
    priceId?: string;
    returnTo?: string;
    type?: string;
  }) => {
    return createCheckoutMutation.mutateAsync({
      priceId: options?.priceId,
      returnTo: options?.returnTo,
      type: options?.type,
    });
  };

  return {
    ...computedValues,
    isLoading,
    error,
    createCheckoutSession,
    isCreatingCheckout: createCheckoutMutation.isPending,
    refetch,
  };
}
