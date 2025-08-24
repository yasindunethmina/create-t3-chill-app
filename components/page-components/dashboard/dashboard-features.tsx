import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  Code2,
  CreditCard,
  Database,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";

export function DashboardFeatures() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          <CardTitle>T3 Chill Stack Features</CardTitle>
        </div>
        <CardDescription>
          Everything is pre-configured and ready to use
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-sm">Authentication</p>
              <p className="text-xs text-muted-foreground">
                Supabase email/password
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-medium text-sm">Database</p>
              <p className="text-xs text-muted-foreground">
                Prisma + PostgreSQL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Code2 className="h-8 w-8 text-orange-600" />
            <div>
              <p className="font-medium text-sm">Type-Safe APIs</p>
              <p className="text-xs text-muted-foreground">tRPC procedures</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <CreditCard className="h-8 w-8 text-purple-600" />
            <div>
              <p className="font-medium text-sm">Payments</p>
              <p className="text-xs text-muted-foreground">
                Stripe subscriptions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-sm">UI Components</p>
              <p className="text-xs text-muted-foreground">
                shadcn/ui + Tailwind
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Terminal className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-sm">Ready to Deploy</p>
              <p className="text-xs text-muted-foreground">Vercel optimized</p>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm font-medium text-primary mb-2">
            🎯 Ready to build?
          </p>
          <p className="text-sm text-muted-foreground">
            Check out the complete setup guide on the{" "}
            <Link href="/" className="text-primary hover:underline">
              homepage
            </Link>{" "}
            to learn how to use all these features together.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
