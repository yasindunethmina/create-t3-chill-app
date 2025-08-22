import { AuthButton } from "@/components/auth-button";
import { HelloClient } from "@/components/hello-client";
import { api } from "./trpc/server";

export default async function Home() {
  const test = await api.hello({ text: "from server" });
  console.log("test", test);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
            <AuthButton />
          </div>
        </nav>
        <div className="p-6">
          <HelloClient />
        </div>
      </div>
    </main>
  );
}
