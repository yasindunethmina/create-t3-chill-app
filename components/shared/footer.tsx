import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Props to{" "}
              <span className="font-semibold text-foreground">
                yasindunethmina
              </span>
            </span>
            <div className="flex items-center space-x-3">
              <Link
                href="https://x.com/yasinduneth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/yasindunethmina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow on GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/yasinduneth/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Built with ❤️ • Inspired by{" "}
            <Link
              href="https://create.t3.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              T3 Stack
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
