import Link from "next/link";
import { AuthButton } from "../auth/auth-button";

export default function MenuTop() {
  return (
    <nav className="sticky top-0 z-50 flex justify-center border-b border-b-foreground/10 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-6xl flex justify-between items-center py-3 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>T3 Chill Stack</Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
