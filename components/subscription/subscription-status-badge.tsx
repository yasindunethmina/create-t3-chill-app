"use client";

import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";

export function SubscriptionStatusBadge() {
  const { isValidSubscription, isLoading } = useSubscription();

  if (isLoading) {
    return <Badge variant="secondary">Loading...</Badge>;
  }

  return (
    <Badge variant={isValidSubscription ? "default" : "secondary"}>
      {isValidSubscription ? "Pro" : "Free"}
    </Badge>
  );
}
