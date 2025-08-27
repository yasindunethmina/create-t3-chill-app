import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code2, CreditCard, Database, Rocket, Shield, Zap } from "lucide-react";
import Link from "next/link";

export function HomeSetupGuide() {
  return (
    <>
      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">One-Command Bootstrap</CardTitle>
            </div>
            <CardDescription>
              Get started instantly with <code>npx create-t3-chill-app</code>.
              Checks your environment, scaffolds your project, installs
              dependencies, and guides you through setup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Fast CLI onboarding</div>
              <div>✅ Environment checks</div>
              <div>✅ Guided setup</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Authentication</CardTitle>
            </div>
            <CardDescription>
              Complete auth system with Supabase. Sign up, login, password
              reset, and email confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Email/password auth</div>
              <div>✅ Protected routes</div>
              <div>✅ Session management</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Database & ORM</CardTitle>
            </div>
            <CardDescription>
              Prisma ORM with Supabase PostgreSQL. Type-safe queries,
              auto-generated types, and easy migrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Type-safe queries</div>
              <div>✅ Auto-generated types</div>
              <div>✅ Effortless migrations</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Stripe Integration</CardTitle>
            </div>
            <CardDescription>
              Complete subscription system with Stripe. Payments, webhooks, and
              protected content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Subscription management</div>
              <div>✅ Webhook handling</div>
              <div>✅ Protected features</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Type-Safe APIs</CardTitle>
            </div>
            <CardDescription>
              End-to-end type safety with tRPC. No REST endpoints, just
              functions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Full-stack TypeScript</div>
              <div>✅ Auto-complete APIs</div>
              <div>✅ Runtime validation</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle className="text-lg">
                Safe Environment Validation
              </CardTitle>
            </div>
            <CardDescription>
              Zod-based validation with automatic server/client separation and
              type safety.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Runtime validation</div>
              <div>✅ Type-safe access</div>
              <div>✅ Server/client separation</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ready to Ship - Full Width */}
      <div className="mt-8">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Ready to Ship</CardTitle>
            </div>
            <CardDescription>
              Skip weeks of setup. Start building your product in minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard">Start Building</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Installation Guides */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Installation Guide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the easiest way to get started with Create T3 Chill App.
          </p>
        </div>

        {/* Easy Installation (Recommended) */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                1
              </div>
              <div>
                <CardTitle className="text-xl">
                  🚀 Easy Installation (Recommended)
                </CardTitle>
                <CardDescription>
                  Use the CLI tool for instant setup.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Step 1: Run the CLI</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`npx create-t3-chill-app`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                The CLI will:
                <ul className="list-disc ml-6">
                  <li>Check your environment (Node.js, Docker)</li>
                  <li>Scaffold your project from a template</li>
                  <li>
                    Install dependencies (unless you use{" "}
                    <code>--skip-install</code>)
                  </li>
                  <li>
                    Start local Supabase containers (unless you use{" "}
                    <code>--skip-setup</code>)
                  </li>
                  <li>Guide you through environment and Stripe setup</li>
                </ul>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Step 2: Prerequisites</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  •{" "}
                  <Link
                    href="https://www.docker.com/products/docker-desktop/"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Docker Desktop
                  </Link>{" "}
                  (must be installed and running)
                </li>
                <li>
                  •{" "}
                  <Link
                    href="https://nodejs.org/"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Node.js 18+
                  </Link>{" "}
                  (must be installed)
                </li>
                <li>• A text editor (VS Code recommended)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Step 3: After Setup</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Follow the on-screen instructions to update your{" "}
                  <code>.env</code> and <code>.env.local</code> files
                </li>
                <li>
                  • For local development, copy the Supabase anon key (shown in
                  the CLI output)
                </li>
                <li>
                  • Stripe integration is optional and can be configured later
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Step 4: Start Developing</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`cd my-t3-chill-app // (or the name of your project)
npm run dev`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                Visit{" "}
                <Link
                  href="http://localhost:3000"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  localhost:3000
                </Link>{" "}
                for your app and a full setup guide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Troubleshooting</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Make sure Docker is running and accessible from your
                  terminal
                </li>
                <li>
                  • Make sure you are using Node.js 18 or higher (
                  <code>node -v</code>)
                </li>
                <li>
                  • On Linux, ensure your user is in the <code>docker</code>{" "}
                  group
                </li>
                <li>
                  • If behind a proxy, use <code>--skip-install</code> and run{" "}
                  <code>npm install</code> manually
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Manual Installation Guide */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Manual Installation (Comprehensive Guide)
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Prefer to set up everything yourself or want to contribute? Follow
              this complete step-by-step guide to install, configure, and deploy
              Create T3 Chill App from scratch.
            </p>
          </div>

          {/* Step 1: Clone & Install */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <CardTitle className="text-xl">Clone & Install</CardTitle>
                  <CardDescription>
                    Get the code and install dependencies.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`git clone https://github.com/yasindunethmina/create-t3-chill-app.git
cd create-t3-chill-app
npm install`}
              </pre>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  •{" "}
                  <Link
                    href="https://www.docker.com/products/docker-desktop/"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Docker Desktop
                  </Link>{" "}
                  must be installed and running
                </li>
                <li>
                  •{" "}
                  <Link
                    href="https://nodejs.org/"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Node.js 18+
                  </Link>{" "}
                  must be installed
                </li>
                <li>• A text editor (VS Code recommended)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 2: Setup Environment Files */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold">
                  2
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Setup Environment Files
                  </CardTitle>
                  <CardDescription>
                    Configure your local environment.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`cp .env.example .env
cp .env.example .env.local`}
              </pre>
              <p className="text-sm text-muted-foreground">
                <code>.env</code> is for database config (Prisma).{" "}
                <code>.env.local</code> is for secrets and overrides.
              </p>
            </CardContent>
          </Card>

          {/* Step 3: Start Local Supabase */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold">
                  3
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Start Local Supabase
                  </CardTitle>
                  <CardDescription>
                    Start your local database and API with Docker.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`npm run db:start`}
              </pre>
              <p className="text-sm text-muted-foreground">
                <strong>Check status:</strong> <code>npm run db:status</code>{" "}
                <br />
                <strong>Stop when done:</strong> <code>npm run db:stop</code>
              </p>
              <p className="text-sm text-muted-foreground">
                This creates a local PostgreSQL database at{" "}
                <code>127.0.0.1:54322</code> and Supabase API at{" "}
                <code>127.0.0.1:54321</code>.
              </p>
            </CardContent>
          </Card>

          {/* Step 4: Configure Local Environment */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 font-bold">
                  4
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Configure Local Environment
                  </CardTitle>
                  <CardDescription>
                    Set up your database and Supabase keys.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Edit your <code>.env</code> file:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"`}
              </pre>
              <p className="text-sm text-muted-foreground">
                Edit your <code>.env.local</code> file:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[LOCAL_ANON_KEY]"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`}
              </pre>
              <p className="text-sm text-muted-foreground">
                Get <code>[LOCAL_ANON_KEY]</code> from{" "}
                <code>npm run db:status</code> or the Supabase dashboard.
              </p>
            </CardContent>
          </Card>

          {/* Step 5: Database Schema & Migrations */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold">
                  5
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Database Schema & Migrations
                  </CardTitle>
                  <CardDescription>
                    Set up your database schema with Prisma.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">a. Generate Prisma Client</h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`npm run prisma:generate`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">b. Reset Database Schema</h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`npm run prisma:reset`}
                </pre>
                <p className="text-sm text-muted-foreground">
                  This creates tables for users, subscriptions, posts, and
                  comments.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">
                  c. (Optional) View Your Database
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`npm run prisma:studio`}
                </pre>
                <p className="text-sm text-muted-foreground">
                  Opens at <code>localhost:5555</code>
                </p>
              </div>
              <div>
                <h4 className="font-semibold">
                  d. (Optional) Making Schema Changes
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`# 1. Generate new migration
npm run prisma:migrate

# 2. Regenerate Prisma client
npm run prisma:generate`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Step 6: Start Development Server */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold">
                  6
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Start Development Server
                  </CardTitle>
                  <CardDescription>Run your app locally.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`npm run dev`}
              </pre>
              <p className="text-sm text-muted-foreground">
                Visit{" "}
                <Link
                  href="http://localhost:3000"
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  localhost:3000
                </Link>{" "}
                for your app and a full setup guide.
              </p>
            </CardContent>
          </Card>

          {/* Step 7: Production Supabase Setup (Optional) */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold">
                  7
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Production Supabase Setup (Optional)
                  </CardTitle>
                  <CardDescription>
                    Set up a production database and environment.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">a. Create Supabase Project</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>
                    • Go to{" "}
                    <Link
                      href="https://supabase.com"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      supabase.com
                    </Link>{" "}
                    and create an account
                  </li>
                  <li>• Click &quot;New Project&quot; and fill in details</li>
                  <li>• Wait for provisioning (~2 minutes)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">
                  b. Get Production Environment Variables
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">
                  c. Get Production Database URLs
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">
                  d. Deploy Schema to Production
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`# Create .env.production file with production URLs above, then:
npm run prisma:migrate:prod`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">
                  e. Switching Between Local & Production
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`# For LOCAL development (Docker)
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[LOCAL_ANON_KEY]"

# For PRODUCTION (comment out local, uncomment these)
# NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Step 8: Stripe Integration (Optional) */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold">
                  8
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Stripe Integration (Optional)
                  </CardTitle>
                  <CardDescription>
                    Add payments and subscriptions.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">
                  a. Create Stripe Account & Product
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>
                    • Create account at{" "}
                    <Link
                      href="https://stripe.com"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      stripe.com
                    </Link>
                  </li>
                  <li>• Go to Products → Add Product</li>
                  <li>
                    • Name: &quot;Pro Plan&quot;, Price: $9.99/month (or your
                    choice)
                  </li>
                  <li>
                    • Save and copy the <strong>Price ID</strong> (starts with{" "}
                    <code>price_</code>)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">b. Get Stripe API Keys</h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`STRIPE_SECRET_KEY="[STRIPE_SECRET_KEY]"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY]"
NEXT_PUBLIC_STRIPE_PRICE_ID="[PRICE_ID]"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">
                  c. Setup Webhook for Local Testing
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret (whsec_...) to .env.local
STRIPE_WEBHOOK_SECRET="[STRIPE_WEBHOOK_SECRET]"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">d. Test Subscription Flow</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>
                    • Start your app: <code>npm run dev</code>
                  </li>
                  <li>
                    • Go to <code>/dashboard</code>
                  </li>
                  <li>• Click &quot;Subscribe Now&quot;</li>
                  <li>
                    • Use test card: <code>4242 4242 4242 4242</code>
                  </li>
                  <li>
                    • Webhook will update subscription status in real-time
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 9: Development & Deployment Commands */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold">
                  9
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Development & Deployment Commands
                  </CardTitle>
                  <CardDescription>
                    Essential commands for daily development and deployment.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Daily Development</h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`npm run dev           # Start Development
npm run db:start      # Start Local DB
npm run prisma:migrate # Database Migration
npm run prisma:studio # View Database
npm run db:reset      # Reset Local DB
npm run build         # Production Build`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold">Production</h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`npm run prisma:migrate:prod # Deploy schema to production
npm run prisma:generate     # Generate Prisma client`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Step 10: Deploy to Vercel */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold">
                  10
                </div>
                <div>
                  <CardTitle className="text-xl">Deploy to Vercel</CardTitle>
                  <CardDescription>Go live with your app!</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                <li>
                  Deploy to{" "}
                  <Link
                    href="https://vercel.com"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Vercel
                  </Link>
                  , Railway, or your preferred platform
                </li>
                <li>
                  Set all production environment variables in your hosting
                  dashboard
                </li>
                <li>
                  Run <code>npm run prisma:migrate:prod</code> for production
                  migrations
                </li>
                <li>
                  Configure production Stripe webhooks:{" "}
                  <code>https://yourdomain.com/api/stripe/webhook</code>
                </li>
              </ol>
              <div>
                <h4 className="font-semibold">
                  Example Environment Variables for Production
                </h4>
                <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                  {`NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
STRIPE_SECRET_KEY="[STRIPE_SECRET_KEY]"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY]"
NEXT_PUBLIC_STRIPE_PRICE_ID="[NEXT_PUBLIC_STRIPE_PRICE_ID]"
STRIPE_WEBHOOK_SECRET="[STRIPE_WEBHOOK_SECRET]"
NEXT_PUBLIC_APP_URL="https://[your-domain].com"`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-16">
            <Button asChild size="lg" className="mb-4">
              <Link href="/dashboard">🚀 Start Building Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
