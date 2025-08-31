## 💡 Create T3 Chill App — Everything You Need in a Minimal, Powerful Stack

**Next.js • Supabase • tRPC • Prisma • Stripe**

The fastest way to ship products with a modern stack. Skip the setup and focus on building your product. <br> **Ideal for developers and founders who want to start building or prototyping quickly with less effort.**

---

## 🚀 Quick Start (Recommended)

**Create a new project in seconds:** <br>

<div align="center">
  
```bash
npx create-t3-chill-app@latest
```

<img width="797" height="739" alt="Screenshot 2025-08-31 220039" src="https://github.com/user-attachments/assets/f603076f-6a11-496b-8951-15cce38fa5fd" />
</div>

---

## ✨ Features

### ⚡️ Instant Project Setup with CLI

- **Streamlined CLI tool:** Quickly scaffold your project with `npx create-t3-chill-app@latest`
- **Environment checks:** Ensures Node.js and Docker are ready before scaffolding
- **Guided setup:** Walks you through environment variables, Supabase, and Stripe integration
- **Flexible options:** Skip dependency install or Supabase setup with CLI flags
- **Automatic local Supabase:** Instantly spins up a local database for development

### 🔐 Authentication & Security

- **Full authentication system:** Powered by Supabase
- **Email/password flows:** Sign up, login, password reset, and email confirmation
- **Protected routes:** Automatic redirects and session management for secure access
- **Session management:** Works seamlessly across server and client

### 🗄️ Database & ORM

- **PostgreSQL via Supabase:** Production-ready database out of the box
- **Prisma ORM:** Type-safe queries and auto-generated TypeScript types
- **Pre-configured schema:** Includes users and subscriptions tables
- **Effortless migrations:** Simple schema management and migration workflow
- **Local-to-production ready:** Seamless migration from local to cloud

### 🔄 Type-Safe APIs

- **tRPC integration:** End-to-end type safety for your APIs
- **Three procedure types:** `publicProcedure`, `authenticatedProcedure`, `subscribedProcedure`
- **Server & client data fetching:** Consistent types everywhere
- **Automatic type generation:** Ensures validation and safety across your stack

### 💳 Payments & Subscriptions

- **Stripe integration:** Complete payment and subscription management
- **Webhook handling:** Real-time updates and safe fallbacks for failures
- **Protected content:** Restrict access based on subscription status
- **Clean UI components:** Subscription management and payment flows

### 🛡️ Environment Validation System

- **Zod-based validation:** Type-safe access to environment variables
- **Automatic separation:** Handles both server and client variables
- **Prevents runtime errors:** Ensures all required config is present

### 🎨 UI & Styling

- **Tailwind CSS:** Rapid, utility-first styling
- **shadcn/ui components:** Modern, accessible UI out of the box
- **Component architecture:** Clean, maintainable, and scalable
- **Custom hooks:** Includes `useSubscription` for easy subscription state

### 🚀 Deploy Ready

- **Optimized for Vercel:** Edge runtime support and pre-configured environment variables
- **Production migration:** Simple commands for deploying and migrating your database
- **Easy Stripe webhooks:** Ready for production with secure webhook endpoints

### 🧪 Testing & Development

- **Comprehensive testing:** Authentication, protected routes, and payment flows
- **Dev commands:** Start, reset, and manage your database and app with simple scripts
- **Prisma Studio:** Visual database management included

---

<div align="center">
  <p>Home Page</p>
  <img width="2500" height="2996" alt="Starter Kit Home Page" src="https://github.com/user-attachments/assets/dd437255-9109-473a-825c-1954ea323932" />
</div>
<br>
<div align="center">
  <p>Protected Dashboard (Before Subscription)</p>
  <img width="2500" height="2860" alt="Protected Dashboard (Before Subscription)" src="https://github.com/user-attachments/assets/9e8d610b-7c28-404e-81b6-7ae828089053" />
  <br>
</div>
<br>
<div align="center">
  <p>Protected Dashboard (After Subscription)</p>
  <img width="2500" height="2694" alt="Protected Dashboard (After Subscription)" src="https://github.com/user-attachments/assets/07939d8a-c4b0-491d-8370-cd9c0138bc8c" />
  <br>
</div>

---

## 📦 Installation

### 🚀 1. Create a New Project (Recommended)

> **This is the fastest and easiest way to get started.**

```bash
npx create-t3-chill-app@latest
cd my-t3-chill-app // Or the name of your project
```

- The CLI will check your environment (Node, Docker)
- Scaffold your project from a template
- Install dependencies (unless you use `--skip-install`)
- Start local Supabase containers (unless you use `--skip-setup`)
- Guide you through environment setup and Stripe integration

#### **What you need before running the command:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) **(must be installed and running)**
- [Node.js 18+](https://nodejs.org/) **(must be installed)**
- A text editor (VS Code recommended)

#### **If you run into issues:**

- Make sure Docker is running and accessible from your terminal
- Make sure you are using Node.js 18 or higher (`node -v`)
- If you see permission errors with Docker on Linux, ensure your user is in the `docker` group
- If you are behind a corporate proxy, dependency installation may fail—try `--skip-install` and run `npm install` manually

#### **After the CLI finishes:**

- Follow the on-screen instructions to update your `.env` and `.env.local` files
- For local development, copy the local Supabase anon key (shown in the CLI output)
- Stripe integration is optional and can be configured later

#### **Start developing:**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for your app and a full setup guide.

---

## 🛠️ Manual Installation (Advanced/Alternative)

> If you want to set up everything yourself, or want to contribute to the starter kit, clone the repo directly:

```bash
git clone https://github.com/yasindunethmina/create-t3-chill-app.git
cd create-t3-chill-app
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

- File issues on [GitHub](https://github.com/yasindunethmina/create-t3-chill-app/issues)

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

**Happy hacking! 🚀**

_If you enjoy this project, please consider giving it a ⭐️ on GitHub!_
