import { api } from "@/app/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function ServerComponent() {
  const hello = await api.hello();

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Server Component</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <div className="text-lg">{hello.greeting}</div>
        </CardContent>
      </Card>
    </div>
  );
}
