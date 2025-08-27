## 🚀 T3 Chill Stack — Everything You Need in a Minimal, Powerful Stack

**Next.js • Supabase • tRPC • Prisma • Stripe**

<p>
  The fastest way to ship products with a modern stack. Skip the setup and focus on building your product.<br>
  <strong>Ideal for developers and founders who want to start building or prototyping quickly with less effort.</strong>
</p>

---

<div align="center">
  <h3>🚀 Quick Start (Recommended)</h3>
  <p><strong>Create a new project in seconds:</strong></p>
  <pre>npx create-t3-chill-app</pre>
</div>

---

## ✨ Features

### 🚀 One-Command Project Bootstrap
- 
  Get started instantly with the `npx create-t3-chill-app` CLI tool. It checks your environment, scaffolds your project, installs dependencies, and guides you through environment and Stripe setup—so you can focus on building, not configuring.

### 🔐 Authentication & Security

- Complete authentication system powered by Supabase
- Email/password authentication, sign up, login, password reset, and email confirmation flows
- Protected routes with automatic redirects and session management (server and client)
- Secure session management and access control

### 🗄️ Database & ORM

- PostgreSQL database via Supabase, ready out of the box
- Prisma ORM with type-safe queries and auto-generated TypeScript types
- Effortless schema management and migrations (local and production)
- Pre-configured schema for users and subscriptions

### 🔄 Type-Safe APIs

- tRPC for end-to-end type safety across your stack
- Three procedure types: `publicProcedure`, `authenticatedProcedure`, `subscribedProcedure`
- Server-side and client-side data fetching
- Automatic type generation and validation

### 💳 Payments & Subscriptions

- Complete Stripe integration for payments and subscriptions
- Subscription management with webhooks and protected content
- Real-time updates and safe fallbacks for webhook failures
- Clean, ready-to-use subscription UI components

### 🛡️ Environment Validation

- Zod-based environment variable validation system
- Type-safe access to environment variables
- Prevents runtime errors from missing configuration
- Handles both development and production environments

### 🎨 UI & Styling

- Modern UI with [shadcn/ui](https://ui.shadcn.com) components and Tailwind CSS
- Responsive design patterns and modern component architecture
- Custom subscription hook (`useSubscription`) for easy subscription state management

### 🧪 Testing & Developer Experience

- Easy local development with Docker and Supabase
- Pre-configured scripts for database management, migrations, and Prisma Studio
- Test authentication, protected routes, and Stripe payment flows out of the box

### 🚀 Deploy Ready

- Optimized for Vercel deployment (or any platform)
- Environment variables pre-configured for local and production
- Edge runtime support for modern hosting environments

---

## 📦 Easy Installation

### 🚀 **1. Create a New Project (Recommended)**

> **This is the fastest and easiest way to get started.**

```bash
npx create-t3-chill-app
cd my-t3-chill-ap  // (or the name you added)
```

- The CLI will check your environment (Node, Docker)
- Scaffold your project from a template
- Install dependencies (unless you use `--skip-install`)
- Start local Supabase containers (unless you use `--skip-setup`)
- Guide you through environment setup and Stripe integration

#### <u>**What you need before running the command:**</u>

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) **(must be installed and running)**
- [Node.js 18+](https://nodejs.org/) **(must be installed)**
- A text editor (VS Code recommended)

#### <u>**If you run into issues:**</u>

- Make sure Docker is running and accessible from your terminal
- Make sure you are using Node.js 18 or higher (`node -v`)
- If you see permission errors with Docker on Linux, ensure your user is in the `docker` group
- If you are behind a corporate proxy, dependency installation may fail—try `--skip-install` and run `npm install` manually

#### <u>**After the CLI finishes:**</u>

- Follow the on-screen instructions to update your `.env` and `.env.local` files
- For local development, copy the local Supabase anon key (shown in the CLI output above since it already starts the container)
- Stripe integration is optional and can be configured later

#### <u>**Start developing:**</u>

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for your app and a full setup guide.

---

## 🛠️ Manual Installation (Advanced/Alternative)

> If you want to set up everything yourself, or want to contribute to the starter kit, clone the repo directly:

```bash
git clone https://github.com/yasindunethmina/t3-chill-stack.git
cd t3-chill-stack
npm install
```

### 1. **Setup Environment Files**

```bash
cp .env.example .env
cp .env.example .env.local
```

### 2. **Start Local Supabase (Docker must be running)**

```bash
npm run db:start
```

### 3. **Generate Prisma Client and Reset DB**

```bash
npm run prisma:generate
npm run prisma:reset
```

### 4. **Start Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the complete setup guide!

---

## 📝 Environment Variables

**.env** (for Prisma/DB):

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

**.env.local** (for app/Supabase/Stripe):

```env
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[LOCAL_ANON_KEY]"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# Stripe (optional, for payments)
STRIPE_SECRET_KEY="[STRIPE_SECRET_KEY]"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY]"
NEXT_PUBLIC_STRIPE_PRICE_ID="[NEXT_PUBLIC_STRIPE_PRICE_ID]"
STRIPE_WEBHOOK_SECRET="[STRIPE_WEBHOOK_SECRET]"
```

---

## 💳 Stripe Integration (Optional)

1. [Create a Stripe account](https://stripe.com)
2. Add a product and get the **Price ID**
3. Add your Stripe keys to `.env.local`
4. [Install Stripe CLI](https://stripe.com/docs/stripe-cli) and run:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

---

## 🧪 Testing

- Start your app: `npm run dev`
- Test authentication (sign up, login, password reset)
- Test protected routes and subscription features
- Test Stripe payment flow (use test card: `4242 4242 4242 4242`)

---

## 🔧 Development Commands

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

---

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Deploy to [Vercel](https://vercel.com), Railway, or your preferred platform
2. Set all production environment variables in your hosting dashboard
3. Run `npm run prisma:migrate:prod` for production migrations
4. Configure production Stripe webhooks: `https://yourdomain.com/api/stripe/webhook`

### Environment Variables for Production

```env
# 🗄️ Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[PRODUCTION_ANON_KEY]"

# 🔺 Database Configuration
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

# 💳 Stripe Configuration
STRIPE_SECRET_KEY="[STRIPE_SECRET_KEY]"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY]"
NEXT_PUBLIC_STRIPE_PRICE_ID="[NEXT_PUBLIC_STRIPE_PRICE_ID]"
STRIPE_WEBHOOK_SECRET="[STRIPE_WEBHOOK_SECRET]"
NEXT_PUBLIC_APP_URL="https://[your-domain].com"
```

---

## 📚 Learn More

For detailed setup instructions and troubleshooting, visit your app's homepage at [localhost:3000](http://localhost:3000) after installation.

---

## 🆘 Support

- File issues on [GitHub](https://github.com/yasindunethmina/t3-chill-stack/issues)

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

<div align="center">
  <strong>Happy hacking! 🚀</strong>
  <br>
  <em>If you enjoy this project, please consider giving it a ⭐️ on GitHub!</em>
</div>
