import { DashboardFeatures } from "@/components/page-components/dashboard/dashboard-features";
import { DashboardUserInfo } from "@/components/page-components/dashboard/dashboard-user-info";
import { ProFeaturesCard } from "@/components/subscription/pro-features-card";
import { SubscriptionCard } from "@/components/subscription/subscription-card";
import { getUser } from "@/lib/supabase/get-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto my-16 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your T3 Chill Stack dashboard!
            </p>
          </div>
        </div>

        {/* User Info */}
        <DashboardUserInfo />

        {/* Stripe Integration Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SubscriptionCard />
          <ProFeaturesCard />
        </div>

        {/* Features */}
        <DashboardFeatures />
      </div>
    </div>
  );
}
