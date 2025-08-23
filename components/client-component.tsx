"use client";

import { trpc } from "@/app/trpc/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ClientComponent() {
  const { data, isLoading, isError, error } = trpc.hello.useQuery();

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Client Component</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 items-center">
          {isLoading && <Skeleton className="h-6 w-32" />}
          {isError && (
            <div className="text-red-500 font-medium">
              Error: {error.message}
            </div>
          )}
          {data && <div className="text-lg">{data.greeting}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
