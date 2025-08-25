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
              <Shield className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Authentication</CardTitle>
            </div>
            <CardDescription>
              Complete auth system with Supabase. Sign up, login, password reset
              - all configured.
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
              <CardTitle className="text-lg">Database Ready</CardTitle>
            </div>
            <CardDescription>
              Prisma ORM with Supabase PostgreSQL. Type-safe queries and easy
              migrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Type-safe queries</div>
              <div>✅ Auto-generated types</div>
              <div>✅ Easy migrations</div>
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
              billing.
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
              End-to-end type safety with tRPC. No more API endpoints, just
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

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Deploy Ready</CardTitle>
            </div>
            <CardDescription>
              Optimized for Vercel deployment with all environment variables
              configured.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div>✅ Vercel optimized</div>
              <div>✅ Environment setup</div>
              <div>✅ Zero config deploy</div>
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

      {/* Comprehensive Setup Guide */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Complete Setup Guide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow this step-by-step guide to get your T3 Chill Stack project up
            and running in minutes.
          </p>
        </div>

        {/* Step 1: Prerequisites & Local Setup */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                1
              </div>
              <div>
                <CardTitle className="text-xl">
                  🐳 Prerequisites & Local Development
                </CardTitle>
                <CardDescription>
                  Install required tools and start local development environment
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Install Required Tools</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Install{" "}
                  <Link
                    href="https://www.docker.com/products/docker-desktop/"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Docker Desktop
                  </Link>{" "}
                  and ensure it&apos;s running
                </li>
                <li>
                  • Install{" "}
                  <Link
                    href="https://nodejs.org/"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Node.js 18+
                  </Link>
                </li>
                <li>
                  • Clone this repository and run{" "}
                  <code className="bg-muted px-1 rounded">npm install</code>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Setup Environment Files</h4>
              <p className="text-sm text-muted-foreground">
                Create these files from the template:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Copy .env.example to .env (for database config - required by Prisma)
cp .env.example .env

# Copy .env.example to .env.local (for secrets and overrides)
cp .env.example .env.local`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                3. Start Local Supabase with Docker
              </h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Start local Supabase instance (requires Docker)
npm run db:start

# Check status - should show all services running
npm run db:status

# Stop when done developing
npm run db:stop`}
              </pre>
              <p className="text-sm text-muted-foreground">
                This creates a local PostgreSQL database at{" "}
                <code className="bg-muted px-1 rounded">127.0.0.1:54322</code>{" "}
                and Supabase API at{" "}
                <code className="bg-muted px-1 rounded">127.0.0.1:54321</code>
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">4. Configure Local Environment</h4>
              <p className="text-sm text-muted-foreground">
                Edit your <code className="bg-muted px-1 rounded">.env</code>{" "}
                file (required for Prisma):
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# .env - Database URLs (MUST be in .env, not .env.local)
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"`}
              </pre>

              <p className="text-sm text-muted-foreground">
                Edit your{" "}
                <code className="bg-muted px-1 rounded">.env.local</code> file:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# .env.local - Local Supabase instance (Docker)
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[LOCAL_ANON_KEY]"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"`}
              </pre>

              <p className="text-sm text-muted-foreground">
                Edit your{" "}
                <code className="bg-muted px-1 rounded">.env.production</code>{" "}
                file:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# .env.production - Production Supabase instance
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://[your-app-url]"`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Database & Prisma */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold">
                2
              </div>
              <div>
                <CardTitle className="text-xl">
                  🔺 Database Schema & Migrations
                </CardTitle>
                <CardDescription>
                  Set up your database schema with Prisma
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Generate Prisma Client</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Generate TypeScript types from schema
npm run prisma:generate`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Run Initial Migration</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Apply database migrations to local instance
npm run prisma:migrate`}
              </pre>
              <p className="text-sm text-muted-foreground">
                This creates tables for users, subscriptions, posts, and
                comments
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                3. View Your Database (Optional)
              </h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Open Prisma Studio to view/edit data
npm run prisma:studio`}
              </pre>
              <p className="text-sm text-muted-foreground">
                Opens at{" "}
                <code className="bg-muted px-1 rounded">localhost:5555</code>
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                4. Making Schema Changes (Development)
              </h4>
              <p className="text-sm text-muted-foreground">
                When you modify{" "}
                <code className="bg-muted px-1 rounded">
                  prisma/schema.prisma
                </code>
                :
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# 1. Generate new migration
npm run prisma:migrate

# 2. Regenerate Prisma client
npm run prisma:generate`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Production Supabase */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold">
                3
              </div>
              <div>
                <CardTitle className="text-xl">
                  🌐 Production Supabase Setup
                </CardTitle>
                <CardDescription>
                  Create production database and get credentials
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Create Supabase Project</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Go to{" "}
                  <Link
                    href="https://supabase.com"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    supabase.com
                  </Link>{" "}
                  and create an account
                </li>
                <li>• Click &quot;New Project&quot; and fill in details</li>
                <li>• Wait for provisioning (~2 minutes)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                2. Get Production Environment Variables
              </h4>
              <p className="text-sm text-muted-foreground">
                From Settings → API:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Get Production Database URLs</h4>
              <p className="text-sm text-muted-foreground">
                From Database → Connection pooling:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Transaction pooler (for DATABASE_URL)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres"

# Session pooler (for DIRECT_URL)  
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">4. Deploy Schema to Production</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Create .env.production file with production URLs above, then:
npm run prisma:migrate:prod`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                5. Switching Between Local & Production
              </h4>
              <p className="text-sm text-muted-foreground">
                In <code className="bg-muted px-1 rounded">.env.local</code>,
                comment/uncomment these lines:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# For LOCAL development (Docker)
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."

# For PRODUCTION development (comment out local, uncomment these)
# NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[production-key]"`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: tRPC */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold">
                4
              </div>
              <div>
                <CardTitle className="text-xl">
                  🔄 tRPC Setup (Type-Safe APIs)
                </CardTitle>
                <CardDescription>
                  Create type-safe API endpoints with full-stack TypeScript
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Creating API Procedures</h4>
              <p className="text-sm text-muted-foreground">
                Add to{" "}
                <code className="bg-muted px-1 rounded">
                  app/trpc/routers/_app.ts
                </code>
                :
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`// Public procedure (no auth required)
getProducts: publicProcedure.query(async ({ ctx }) => {
  return await ctx.prisma.product.findMany();
}),

// Authenticated procedure (login required)
createProduct: authenticatedProcedure
  .input(z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number()
  }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.product.create({
      data: {
        ...input,
        userId: ctx.user.id
      }
    });
  }),

// Subscription-only procedure (paid users only)
getAnalytics: subscribedProcedure.query(async ({ ctx }) => {
  return { message: "Premium analytics data" };
}),`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Server-Side Data Fetching</h4>
              <p className="text-sm text-muted-foreground">
                In your server components:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`// app/products/page.tsx
import { trpcServer } from "@/app/trpc/server";

export default async function ProductsPage() {
  const products = await trpcServer.getProducts();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Client-Side Queries</h4>
              <p className="text-sm text-muted-foreground">
                In your client components:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`"use client";
import { trpcClient } from "@/app/trpc/client";

export function ProductList() {
  const { data: products, isLoading } = trpcClient.getProducts.useQuery();
  const createProduct = trpcClient.createProduct.useMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Stripe Integration */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-zinc-600 font-bold">
                5
              </div>
              <div>
                <CardTitle className="text-xl">
                  💳 Stripe Integration Setup
                </CardTitle>
                <CardDescription>
                  Configure payments and subscriptions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">
                1. Create Stripe Account & Product
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Create account at{" "}
                  <Link
                    href="https://stripe.com"
                    className="text-primary hover:underline"
                    target="_blank"
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
                  <code className="bg-muted px-1 rounded">price_</code>)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Get Stripe API Keys</h4>
              <p className="text-sm text-muted-foreground">
                From Developers → API keys:
              </p>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Add to .env.local
STRIPE_SECRET_KEY="sk_test_51..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51..."
NEXT_PUBLIC_STRIPE_PRICE_ID="[PRICE_ID]"`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">
                3. Setup Webhook for Local Testing
              </h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                {`# Install Stripe CLI (one time)
# Download from: https://stripe.com/docs/stripe-cli

# Login and forward events to your local webhook
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret (whsec_...) to .env.local
STRIPE_WEBHOOK_SECRET="whsec_..."`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">4. Test Subscription Flow</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Start your app:{" "}
                  <code className="bg-muted px-1 rounded">npm run dev</code>
                </li>
                <li>
                  • Go to{" "}
                  <code className="bg-muted px-1 rounded">/dashboard</code>
                </li>
                <li>• Click &quot;Subscribe Now&quot;</li>
                <li>
                  • Use test card:{" "}
                  <code className="bg-muted px-1 rounded">
                    4242 4242 4242 4242
                  </code>
                </li>
                <li>• Webhook will update subscription status in real-time</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 6: Environment Validation */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 font-bold">
                6
              </div>
              <div>
                <CardTitle className="text-xl">
                  🛡️ Environment Validation System
                </CardTitle>
                <CardDescription>
                  Understand how the Zod-based validation keeps your app safe
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">How It Works</h4>
              <p className="text-sm text-muted-foreground">
                The T3 Chill Stack automatically validates all environment
                variables on startup:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <strong>Zod Schemas:</strong> Each variable type has a
                  validation schema
                </li>
                <li>
                  • <strong>Server/Client Separation:</strong> Automatic
                  detection and validation
                </li>
                <li>
                  • <strong>Runtime Safety:</strong> Prevents app startup with
                  missing variables
                </li>
                <li>
                  • <strong>Type Safety:</strong> Full TypeScript support across
                  contexts
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Key Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <strong>Automatic Context Detection:</strong> Server vs
                  client validation
                </li>
                <li>
                  • <strong>Type-Safe Access:</strong> Full IntelliSense support
                  in your editor
                </li>
                <li>
                  • <strong>Required vs Optional:</strong> Database and Supabase
                  are required, Stripe is optional
                </li>
                <li>
                  • <strong>Production Ready:</strong> Handles both development
                  and production environments
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Benefits</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • <strong>No Runtime Errors:</strong> Catch missing variables
                  before app starts
                </li>
                <li>
                  • <strong>Easy Debugging:</strong> Clear messages show exactly
                  what&apos;s missing
                </li>
                <li>
                  • <strong>Type Safety:</strong> Full IntelliSense support in
                  your editor
                </li>
                <li>
                  • <strong>Production Ready:</strong> Prevents deployment with
                  missing config
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 7: Development & Deployment */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold">
                7
              </div>
              <div>
                <CardTitle className="text-xl">
                  🛠️ Development Commands & Deployment
                </CardTitle>
                <CardDescription>
                  Essential commands for daily development
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Daily Development Commands</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Start Development</p>
                  <pre className="text-xs bg-muted p-2 rounded">
                    npm run dev
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium">Start Local DB</p>
                  <pre className="text-xs bg-muted p-2 rounded">
                    npm run db:start
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium">Database Migration</p>
                  <pre className="text-xs bg-muted p-2 rounded">
                    npm run prisma:migrate
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium">View Database</p>
                  <pre className="text-xs bg-muted p-2 rounded">
                    npm run prisma:studio
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium">Reset Local DB</p>
                  <pre className="text-xs bg-muted p-2 rounded">
                    npm run db:reset
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium">Production Build</p>
                  <pre className="text-xs bg-muted p-2 rounded">
                    npm run build
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Production Deployment</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Deploy to{" "}
                  <Link
                    href="https://vercel.com"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    Vercel
                  </Link>
                  , Railway, or your preferred platform
                </li>
                <li>
                  • Set all production environment variables in your hosting
                  dashboard
                </li>
                <li>
                  • Run{" "}
                  <code className="bg-muted px-1 rounded">
                    npm run prisma:migrate:prod
                  </code>{" "}
                  for production migrations
                </li>
                <li>
                  • Configure production Stripe webhooks:{" "}
                  <code className="bg-muted px-1 rounded">
                    https://yourdomain.com/api/stripe/webhook
                  </code>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-16">
          <Button asChild size="lg" className="mb-4">
            <Link href="/dashboard">🚀 Start Building Now</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Complete local setup takes less than 15 minutes with Docker!
          </p>
        </div>
      </div>
    </>
  );
}
