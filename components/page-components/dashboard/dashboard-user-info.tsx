import { trpcServer } from "@/app/trpc/server";
import { SubscriptionStatusBadge } from "@/components/subscription/subscription-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export async function DashboardUserInfo() {
  const profile = await trpcServer.user.getProfile();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Your Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <div className="group inline-block cursor-pointer">
              {/* Masked email (visible by default, hidden on hover) */}
              <p className="font-medium group-hover:hidden">
                {profile?.email?.slice(0, 4)}...@{profile?.email?.split("@")[1]}
              </p>
              {/* Real email (hidden by default, visible on hover) */}
              <p className="font-medium hidden group-hover:block">
                {profile?.email}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Subscription</p>
            <SubscriptionStatusBadge />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-medium">
              {profile?.subscription?.createdAt
                ? new Date(
                    profile?.subscription?.createdAt,
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
