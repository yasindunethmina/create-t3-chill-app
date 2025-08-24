"use client";

import { trpcClient } from "@/app/trpc/client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader2, Lock, Star } from "lucide-react";

export function ProFeaturesCard() {
  const {
    isValidSubscription,
    statusLabel,
    isLoading: isSubscriptionLoading,
  } = useSubscription();
  const {
    data: proFeatures,
    isLoading,
    error,
  } = trpcClient.user.getProFeatures.useQuery(undefined, {
    enabled: isValidSubscription === true,
  });

  if (!isValidSubscription) {
    return (
      <Card className="h-full w-full border-dashed border-2 border-muted-foreground/25 flex flex-col">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl text-muted-foreground">
            Pro Features
          </CardTitle>
          <CardDescription>
            Subscribe to access advanced dashboard features and premium content
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            🔒 Subscribe to unlock premium features
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || isSubscriptionLoading) {
    return (
      <Card className="h-full w-full flex flex-col items-center justify-center">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full w-full flex flex-col items-center justify-center border-red-200 dark:border-red-800">
        <CardContent className="py-6">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            Error loading pro features. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Star className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Pro Features</CardTitle>
            <CardDescription>
              You have access to all premium features
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        {proFeatures?.message && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-200">
              {proFeatures.message}
            </p>
          </div>
        )}

        {proFeatures?.features && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Available Features:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {proFeatures.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Subscription Status</span>
            <Badge
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              {statusLabel}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
