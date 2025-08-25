# 🚀 T3 Chill Stack

**Next.js • Supabase • tRPC • Prisma • Stripe**

The fastest way to ship products with a modern stack. Skip the setup, focus on building your product.

## ✨ Features

### 🔐 **Authentication & Security**

- Complete authentication system with [Supabase](https://supabase.com)
- Email/password auth with session management
- Protected routes and middleware
- Password reset and email confirmation

### 🗄️ **Database & ORM**

- [Prisma](https://prisma.io) ORM with PostgreSQL
- Type-safe database queries
- Easy migrations and schema management
- Auto-generated TypeScript types

### 🔄 **Type-Safe APIs**

- [tRPC](https://trpc.io) for end-to-end type safety
- No more REST endpoints - just functions
- Real-time queries with React Query
- Server and client-side data fetching

### 💳 **Payments & Subscriptions**

- Complete [Stripe](https://stripe.com) integration
- Subscription management with webhooks
- Protected features based on subscription status
- Clean subscription UI components

### 🎨 **UI & Styling**

- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com/) components
- Responsive design patterns
- Modern component architecture

### 🚀 **Deploy Ready**

- Optimized for [Vercel](https://vercel.com) deployment
- Environment variables pre-configured
- Edge runtime support

## 🎯 Quick Start

```bash
# 1. Clone and Install
git clone <your-repo>
cd t3-chill-sack
npm install

# 2. Environment Setup
cp .env.example .env
cp .env.example .env.local

# 3. Database Setup
npm run prisma:generate
npm run prisma:migrate

# 4. Start Development
npm run dev
```

Visit [localhost:3000](http://localhost:3000) for the complete setup guide!

## 🛠️ Complete Setup Guide

**The fastest way to get started:** Visit your app's homepage at [localhost:3000](http://localhost:3000) after installation for a comprehensive step-by-step setup guide with detailed instructions.

### 📋 Prerequisites

Before you begin, ensure you have:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Node.js 18+](https://nodejs.org/) installed
- A text editor (VS Code recommended)

### 🐳 Step 1: Prerequisites & Local Development

#### 1. Install Required Tools

- Install Docker Desktop and ensure it's running
- Install Node.js 18+
- Clone this repository and run `npm install`

#### 2. Setup Environment Files

Create these files from the template:

```bash
# Copy .env.example to .env (for database config - required by Prisma)
cp .env.example .env

# Copy .env.example to .env.local (for secrets and overrides)
cp .env.example .env.local
```

#### 3. Start Local Supabase with Docker

```bash
# Start local Supabase instance (requires Docker)
npm run db:start

# Check status - should show all services running
npm run db:status

# Stop when done developing
npm run db:stop
```

This creates a local PostgreSQL database at `127.0.0.1:54322` and Supabase API at `127.0.0.1:54321`

#### 4. Configure Local Environment

Edit your `.env` file (required for Prisma):

```env
# .env - Database URLs (MUST be in .env, not .env.local)
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

Edit your `.env.local` file:

```env
# .env.local - Local Supabase instance (Docker)
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[LOCAL_ANON_KEY]"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 🔺 Step 2: Database Schema & Migrations

#### 1. Generate Prisma Client

```bash
# Generate TypeScript types from schema
npm run prisma:generate
```

#### 2. Run Initial Migration

```bash
# Apply database migrations to local instance
npm run prisma:migrate
```

This creates tables for users, subscriptions, posts, and comments

#### 3. View Your Database (Optional)

```bash
# Open Prisma Studio to view/edit data
npm run prisma:studio
```

Opens at `localhost:5555`

### 🌐 Step 3: Production Supabase Setup

#### 1. Create Supabase Project

- Go to [supabase.com](https://supabase.com) and create an account
- Click "New Project" and fill in details
- Wait for provisioning (~2 minutes)

#### 2. Get Production Environment Variables

From Settings → API:

```env
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"
```

#### 3. Get Production Database URLs

From Database → Connection pooling:

```env
# Transaction pooler (for DATABASE_URL)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres"

# Session pooler (for DIRECT_URL)
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"
```

#### 4. Deploy Schema to Production

```bash
# Create .env.production file with production URLs above, then:
npm run prisma:migrate:prod
```

### 💳 Step 4: Stripe Integration Setup

#### 1. Create Stripe Account & Product

- Create account at [stripe.com](https://stripe.com)
- Go to Products → Add Product
- Name: "Pro Plan", Price: $9.99/month (or your choice)
- Save and copy the **Price ID** (starts with `price_`)

#### 2. Get Stripe API Keys

From Developers → API keys:

```env
# Add to .env.local
STRIPE_SECRET_KEY="sk_test_51..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51..."
NEXT_PUBLIC_STRIPE_PRICE_ID="[PRICE_ID]"
```

#### 3. Setup Webhook for Local Testing

```bash
# Install Stripe CLI (one time)
# Download from: https://stripe.com/docs/stripe-cli

# Login and forward events to your local webhook
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret (whsec_...) to .env.local
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### 4. Test Subscription Flow

- Start your app: `npm run dev`
- Go to `/dashboard`
- Click "Subscribe Now"
- Use test card: `4242 4242 4242 4242`
- Webhook will update subscription status in real-time

## 🔧 Development Commands

### Daily Development Commands

```bash
# Start Development
npm run dev

# Start Local DB
npm run db:start

# Database Migration
npm run prisma:migrate

# View Database
npm run prisma:studio

# Reset Local DB
npm run db:reset

# Production Build
npm run build
```

### Production Commands

```bash
# Deploy schema to production
npm run prisma:migrate:prod

# Generate Prisma client
npm run prisma:generate
```

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Deploy to [Vercel](https://vercel.com), Railway, or your preferred platform
2. Set all production environment variables in your hosting dashboard
3. Run `npm run prisma:migrate:prod` for production migrations
4. Configure production Stripe webhooks: `https://yourdomain.com/api/stripe/webhook`

### Environment Variables for Production

Create these environment variables in your hosting platform:

```env
# 🗄️ Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"

# 🔺 Database Configuration
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

# 💳 Stripe Configuration
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="https://[your-domain].com"
```

## 📖 What's Included

### 🔐 **Authentication System**

- Email/password authentication with Supabase
- Protected routes with automatic redirects
- Session management across server and client
- Password reset and email confirmation flows

### 🗄️ **Database & ORM**

- PostgreSQL database via Supabase
- Prisma ORM with type-safe queries
- Pre-configured schema with users and subscriptions
- Migration system for schema changes

### 🔄 **Type-Safe APIs**

- tRPC procedures for full-stack type safety
- Three procedure types: `publicProcedure`, `authenticatedProcedure`, `subscribedProcedure`
- Server-side and client-side data fetching
- Automatic type generation and validation

### 💳 **Stripe Integration**

- Complete subscription management system
- Webhook handling for real-time updates
- Protected content based on subscription status
- Clean subscription UI components

### 🛡️ **Environment Validation System**

- Zod-based validation with automatic server/client separation
- Type-safe access to environment variables
- Prevents runtime errors from missing configuration
- Handles both development and production environments

### 🎨 **UI & Styling**

- shadcn/ui components with Tailwind CSS
- Responsive design patterns
- Modern component architecture
- Custom subscription hook (`useSubscription`)

## 📚 Learn More

For detailed setup instructions and troubleshooting, visit your app's homepage at [localhost:3000](http://localhost:3000) after installation.

## 🆘 Support

- File issues on [GitHub](https://github.com/supabase/supabase/issues)
- Join the [Supabase Discord](https://discord.supabase.com)
- Check out [Supabase Documentation](https://supabase.com/docs)

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
