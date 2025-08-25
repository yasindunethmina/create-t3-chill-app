import { trpcServer } from "@/app/trpc/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/lib/supabase/get-user";
import { Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type RedirectPageProps = {
  searchParams: {
    session_id?: string;
    type?: string;
    return_to?: string;
  };
};

export default async function RedirectPage({
  searchParams,
}: RedirectPageProps) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const {
    session_id: sessionId = "",
    type = "",
    return_to: returnTo = "/",
  } = searchParams;

  if (!sessionId) {
    redirect(returnTo);
  }

  // Handle different redirect types
  if (type === "subscription") {
    try {
      await trpcServer.subscription.verifyCheckoutSession({ sessionId });
      // Verification successful - redirect will happen after this try-catch
    } catch (error) {
      // Only catch actual errors, not NEXT_REDIRECT
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        String(error.digest).includes("NEXT_REDIRECT")
      ) {
        // This is a redirect, re-throw it to let Next.js handle it
        throw error;
      }

      console.error("Error during session verification:", error);

      // Error occurred during verification
      return (
        <div className="my-20 flex items-center justify-center">
          <Card className="w-full max-w-md border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-xl">Verification Failed</CardTitle>
              <CardDescription>
                We couldn&apos;t verify your payment. Please contact support.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                {error instanceof Error
                  ? error.message
                  : "Please try again or contact support if the problem persists."}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href={returnTo}>Go to Dashboard</Link>
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

    // If we reach here, verification was successful, now redirect
    redirect(returnTo);
  } else {
    // Handle other redirect types or unknown types
    console.warn("Unknown or unsupported redirect type:", type);
    // For now, just redirect to the return URL since we don't have other types implemented
    redirect(returnTo);
  }

  // Default loading state while processing (should rarely be seen)
  return (
    <div className="my-20 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
          <CardTitle className="text-xl">Processing...</CardTitle>
          <CardDescription>
            Please wait while we process your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Session ID:</span>
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                {sessionId?.slice(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="capitalize">{type}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-4 border-t">
            This usually takes just a few seconds. Please don&apos;t refresh the
            page.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
