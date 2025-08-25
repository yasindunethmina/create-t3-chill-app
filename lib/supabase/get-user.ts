import { createClient } from "./server";

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data?.user ?? null;
}
