import { trpcServer } from "@/app/trpc/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StripeVerifyResultT } from "@/lib/stripe/types";
import { getUser } from "@/lib/supabase/get-user";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getStripeErrorInfo(result: StripeVerifyResultT) {
  if (result.alreadyActive) {
    return {
      title: "Subscription Already Active",
      description: "Your subscription is already active.",
      details:
        "No further action is required. If you believe this is an error, contact support.",
      buttonText: "Go to Dashboard",
      buttonLink: "/dashboard",
    };
  }
  if (result.recovered) {
    return {
      title: "Subscription Recovered",
      description: "Your subscription was recovered, but something went wrong.",
      details: "Please contact support for assistance.",
      buttonText: "Go to Home",
      buttonLink: "/",
    };
  }
  return {
    title: "Verification Failed",
    description: "We couldn't verify your payment. Please contact support.",
    details: "Please try again or contact support if the problem persists.",
    buttonText: "Go to Home",
    buttonLink: "/",
  };
}

export default async function RedirectPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  const sessionId =
    typeof params.session_id === "string" ? params.session_id : "";
  const pageType = typeof params.type === "string" ? params.type : "";
  const returnTo =
    typeof params.return_to === "string" ? params.return_to : "/";

  const user = await getUser();
  if (!user) {
    return redirect("/auth/login");
  }

  if (pageType === "subscription") {
    if (!sessionId) {
      return redirect(returnTo);
    }

    const result: StripeVerifyResultT =
      await trpcServer.subscription.verifyCheckoutSession({
        sessionId,
      });

    if (result.success) {
      return redirect(returnTo);
    }

    const { title, description, details, buttonText, buttonLink } =
      getStripeErrorInfo(result);

    return (
      <div className="my-20 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">{details}</div>
            <div className="flex gap-2">
              <Button variant="outline" asChild className="flex-1">
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
              <Button variant="default" asChild className="flex-1">
                <Link href="mailto:contact@m.com">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // default fallback
  return redirect(returnTo);
}
