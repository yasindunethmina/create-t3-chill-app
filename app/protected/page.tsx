import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { api } from "../trpc/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const { data: notes } = await supabase.from("notes").select();

  console.log(notes);

  const whoami = await api.whoami();

  const markets = await api.marketsAll();

  console.log("markets", markets);

  console.log("whoami", whoami);

  return <div>Protected Page</div>;
}
