import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { api } from "../trpc/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const whoami = await api.whoami();
  const posts = await api.getPosts();

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Protected Page</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 items-center">
          <div className="text-lg">
            Welcome, <span className="font-semibold">{whoami.email}</span>
          </div>
          {posts.length > 0 && (
            <div className="text-xs">
              <pre>{JSON.stringify(posts, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
