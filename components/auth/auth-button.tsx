"use client";

import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogoutButton } from "./logout-button";

export function AuthButton() {
  const { user } = useAuth();

  return user ? (
    <LogoutButton />
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
