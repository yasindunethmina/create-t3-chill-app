# 🚀 Create T3 Chill App CLI

**The fastest way to ship products with Next.js, Supabase, tRPC, Prisma, and Stripe.**

Create T3 Chill App is a powerful CLI tool that scaffolds a complete full-stack application with modern technologies. Skip the tedious setup and focus on building your product with a production-ready stack that includes authentication, database, type-safe APIs, and payment processing.

## ✨ Features

### 🎯 **Smart Prerequisites Checking**

- **Interactive validation**: Checks Node.js version (18+) and Docker installation/status
- **User-friendly retry system**: If prerequisites aren't met, the CLI waits for you to fix them instead of crashing
- **Helpful suggestions**: Provides actionable guidance for common setup issues

### 🛠️ **Intelligent Project Setup**

- **Template scaffolding**: Copies a complete project template with best practices
- **Environment management**: Creates and manages `.env` and `.env.local` files
- **Dependency handling**: Automatically installs npm dependencies (can be skipped)
- **Docker orchestration**: Sets up local Supabase containers with proper port management

### 🔧 **Database & ORM Integration**

- **Prisma setup**: Generates client and applies database schema automatically
- **Migration handling**: Runs initial migrations and seeds the database
- **Local development**: Configures local PostgreSQL via Supabase containers
- **Production ready**: Easy migration path from local to production

### 💳 **Stripe Integration (Optional)**

- **Guided setup**: Interactive prompts for Stripe configuration
- **Webhook handling**: Sets up local webhook endpoints for testing
- **Environment validation**: Ensures all required Stripe variables are configured
- **Production guidance**: Clear instructions for production Stripe setup

## 🚀 Quick Start

```bash
npx create-t3-chill-app@latest
```

## 📖 Usage

### Basic Usage

```bash
# Create a new project with interactive setup
npx create-t3-chill-app

# Create with a specific name
npx create-t3-chill-app my-t3-chill-app

# Skip all prompts and use defaults
npx create-t3-chill-app --yes

# Skip dependency installation
npx create-t3-chill-app --skip-install

# Skip database and container setup
npx create-t3-chill-app --skip-setup
```

### CLI Options

| Option           | Alias | Description                       |
| ---------------- | ----- | --------------------------------- |
| `--yes`          | `-y`  | Skip prompts and use defaults     |
| `--skip-install` |       | Skip installing dependencies      |
| `--skip-setup`   |       | Skip database and container setup |
| `--version`      | `-V`  | Output the version number         |
| `--help`         | `-h`  | Display help for command          |

## 🔄 What the CLI Does

### 1. **Prerequisites Check** 🔍

- Validates Node.js version (18+ required)
- Checks Docker installation and running status
- **Interactive retry**: If issues are found, waits for you to fix them
- **Smart suggestions**: Provides helpful guidance and download links

### 2. **Project Creation** 📁

- Prompts for project name with validation
- Creates project directory structure
- Copies template files with modern Next.js setup
- Sets up TypeScript configuration

### 3. **Environment Setup** ⚙️

- Creates `.env` and `.env.local` files
- **Interactive validation**: Guides you through required environment variables
- **Retry mechanism**: Waits for you to add missing variables
- Validates environment variable format and completeness

### 4. **Dependency Installation** 📦

- Runs `npm install` (unless `--skip-install` is used)
- Handles installation errors gracefully
- Provides troubleshooting suggestions for common issues

### 5. **Database Setup** 🗄️

- Starts local Supabase containers via Docker
- Waits for containers to be healthy
- Generates Prisma client
- Applies database migrations and seeds

### 6. **Final Guidance** 🎯

- Shows project location and next steps
- Provides local Supabase credentials
- Offers Stripe setup instructions (optional)
- Displays helpful development commands

## 🛡️ Error Handling

The CLI features robust error handling with:

- **Consistent color coding**: Red for errors, yellow for warnings/prompts, green for success
- **Contextual suggestions**: Specific guidance for different error types
- **Graceful recovery**: Interactive retry loops for fixable issues
- **Clean exit**: Ctrl+C support with proper cleanup

## 📋 Prerequisites

Before running the CLI, ensure you have:

- **[Node.js 18+](https://nodejs.org/)** - JavaScript runtime
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** - Must be installed and running
- **Text editor** - VS Code recommended

## 🔧 Development

If you want to contribute or modify the CLI:

```bash
# Clone the repository
git clone https://github.com/yasindunethmina/create-t3-chill-app.git
cd create-t3-chill-app/cli

# Install dependencies
npm install

# Build the CLI
npm run build

# Test locally
node dist/index.js my-t3-chill-app

# Run in development mode
npm run dev
```

### Available Scripts

```bash
npm run build          # Build the CLI for production
npm run dev           # Run CLI in development mode
npm run lint          # Lint TypeScript files
npm run type-check    # Run TypeScript type checking
```

## 🎯 What You Get

After running the CLI, you'll have a complete full-stack application with:

### 🔐 **Authentication System**

- Email/password authentication via Supabase
- Sign up, login, password reset flows
- Protected routes and session management

### 🗄️ **Database & ORM**

- PostgreSQL database via Supabase
- Prisma ORM with type-safe queries
- Pre-configured schema with users and subscriptions

### 🔄 **Type-Safe APIs**

- tRPC for end-to-end type safety
- Server and client data fetching
- Public, authenticated, and subscription-protected procedures

### 💳 **Payment Processing**

- Stripe integration for subscriptions
- Webhook handling for real-time updates
- Protected content based on subscription status

### 🎨 **Modern UI**

- Tailwind CSS for styling
- shadcn/ui components
- Dark/light theme support
- Responsive design

## 🚀 Next Steps

After the CLI completes:

1. **Navigate to your project**:

   ```bash
   cd your-project-name
   ```

2. **Start development**:

   ```bash
   npm run dev
   ```

3. **Visit your app**: [http://localhost:3000](http://localhost:3000)

4. **Follow the setup guide** on the homepage for Stripe configuration and deployment

## 🆘 Troubleshooting

### Common Issues

**Docker not running:**

```bash
# Start Docker Desktop and try again
npx create-t3-chill-app
```

**Node.js version too old:**

```bash
# Install Node.js 18+ from https://nodejs.org/
node --version  # Should be 18+
```

**Permission errors (Linux):**

```bash
# Add your user to the docker group
sudo usermod -aG docker $USER
# Log out and back in
```

**Corporate proxy issues:**

```bash
# Skip installation and run manually
npx create-t3-chill-app --skip-install
cd your-project
npm install
```

## 📚 Resources

- **[Full Documentation](https://github.com/yasindunethmina/create-t3-chill-app)** - Complete setup guide
- **[Next.js Docs](https://nextjs.org/docs)** - React framework
- **[Supabase Docs](https://supabase.com/docs)** - Database and auth
- **[tRPC Docs](https://trpc.io/docs)** - Type-safe APIs
- **[Prisma Docs](https://www.prisma.io/docs)** - Database ORM
- **[Stripe Docs](https://stripe.com/docs)** - Payment processing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy building! 🎉**

_If you find this CLI helpful, please consider giving it a ⭐️ on [GitHub](https://github.com/yasindunethmina/create-t3-chill-app)!_
