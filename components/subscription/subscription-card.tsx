"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";
import { getDefaultPlan } from "@/lib/stripe";
import { AlertTriangle, Check, Crown, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SubscriptionCard() {
  const {
    isValidSubscription,
    stripeEnabled,
    statusLabel,
    currentPeriodEnd,
    isLoading,
    createCheckoutSession,
    isCreatingCheckout,
  } = useSubscription();

  const handleSubscribe = async () => {
    try {
      const result = await createCheckoutSession({
        returnTo: "/dashboard", // You can customize this based on context
        type: "subscription",
      });

      if (result.url) {
        // Redirect to Stripe Checkout - this is the secure payment page
        window.location.href = result.url;
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
      console.error("Subscription error:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const plan = getDefaultPlan();

  // Show warning if Stripe is not configured
  if (!stripeEnabled) {
    return (
      <Card className="flex flex-col items-center justify-center h-full w-full border-orange-200 dark:border-orange-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
            <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-xl text-orange-800 dark:text-orange-200">
            Stripe Not Configured
          </CardTitle>
          <CardDescription className="text-orange-700 dark:text-orange-300">
            Please configure your Stripe environment variables to enable
            subscriptions
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {!isValidSubscription && (
        <Card className="flex-1 w-full border-2 border-primary/20 flex flex-col">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Upgrade to {plan.name}</CardTitle>
            <CardDescription className="text-lg">
              {plan.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="text-center">
              <div className="text-3xl font-bold">{plan.price}</div>
              <div className="text-sm text-muted-foreground">
                per {plan.interval}
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSubscribe}
              disabled={isCreatingCheckout}
            >
              {isCreatingCheckout ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {isValidSubscription && (
        <Card className="flex-1 w-full border-2 border-green-500/20 bg-green-50/50 dark:bg-green-950/20 flex flex-col">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Crown className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl text-green-800 dark:text-green-200">
              Pro Member
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              You have access to all premium features
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {statusLabel}
                </span>
              </div>
              {currentPeriodEnd && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Next Billing</span>
                  <span className="text-sm text-muted-foreground">
                    {currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
