"use client";

import { trpc } from "@/app/trpc/client";

export function HelloClient() {
  const { data, isLoading, error } = trpc.hello.useQuery({
    text: "from client",
  });

  if (isLoading) return <span>Loading…</span>;
  if (error) return <span>Error: {error.message}</span>;

  return <span>{data?.greeting}</span>;
}
