import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import Link from "next/link";

export function HomeHero() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col gap-6 items-center justify-center mt-16 text-center">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-sm">
            <Zap className="h-3 w-3 mr-1" />
            T3 Chill Stack
          </Badge>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Ship products faster
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A complete starter kit with Next.js, Supabase, tRPC, Prisma, and
          Stripe. Skip the setup, focus on building your product.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
        {[
          { name: "Next.js", icon: "⚛️", link: "https://nextjs.org/" },
          { name: "Supabase", icon: "🗄️", link: "https://supabase.com/" },
          { name: "tRPC", icon: "🔄", link: "https://trpc.io/" },
          { name: "Prisma", icon: "🔺", link: "https://www.prisma.io/" },
          { name: "Stripe", icon: "💳", link: "https://stripe.com/" },
        ].map((tech) => (
          <Link
            href={tech.link}
            key={tech.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              key={tech.name}
              className="text-center p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="text-2xl mb-2">{tech.icon}</div>
              <div className="font-medium text-sm">{tech.name}</div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
