// App Information
const appConfig = {
  name: "create-t3-chill-app",
  version: "1.1.1",
  description:
    "Build a project with Next.js, Supabase, tRPC, Prisma, and Stripe using the Create T3 Chill App CLI.",
} as const;

const asciiArt = `
  █▀▀ █▀▀█ █▀▀ █▀▀█ ▀▀█▀▀ █▀▀ ░░ ▀▀█▀▀ █▀▀█ ░░ █▀▀ █░░█ ░▀░ █░░ █░░ ░░ █▀▀█ █▀▀█ █▀▀█ 
  █░░ █▄▄▀ █▀▀ █▄▄█ ░░█░░ █▀▀ ▀▀ ░░█░░ ░░▀▄ ▀▀ █░░ █▀▀█ ▀█▀ █░░ █░░ ▀▀ █▄▄█ █░░█ █░░█ 
  ▀▀▀ ▀░▀▀ ▀▀▀ ▀░░▀ ░░▀░░ ▀▀▀ ░░ ░░▀░░ █▄▄█ ░░ ▀▀▀ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀ ░░ ▀░░▀ █▀▀▀ █▀▀▀
  ` as const;

// Requirements
const requirements = {
  nodeVersion: 18,
  dockerPorts: {
    start: 54321,
    end: 54329,
  },
} as const;

// Environment Configuration
const environmentConfig = {
  files: [".env", ".env.local", ".env.production", ".env.example"],
  requiredVars: ["DATABASE_URL", "DIRECT_URL"],
  requiredLocalVars: [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
    "NODE_ENV",
  ],
  stripeVars: [
    "STRIPE_SECRET_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_STRIPE_PRICE_ID",
    "STRIPE_WEBHOOK_SECRET",
  ],
} as const;

// Template Structure
const templateStructure = {
  directories: [
    "template",
    "template/app",
    "template/components",
    "template/lib",
    "template/hooks",
    "template/providers",
    "template/prisma",
    "template/supabase",
  ],
  coreFiles: [
    "next.config.ts",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "components.json",
    "eslint.config.mjs",
    "tsconfig.json",
    "next-env.d.ts",
    "middleware.ts",
    "prisma.config.ts",
    ".gitignore",
    ".npmignore",
    ".prettierrc",
    "STRIPE_SETUP.md",
    "README.md",
    "app/favicon.ico",
    "app/globals.css",
    "app/layout.tsx",
    "app/page.tsx",
    "lib/utils.ts",
    "lib/env.ts",
    "lib/prisma.ts",
    "lib/routes.ts",
    "supabase/config.toml",
    "supabase/.gitignore",
  ],
  sourceDirectories: [
    "app/trpc",
    "app/api",
    "app/(protected)",
    "app/auth",
    "lib/supabase",
    "lib/stripe",
    "components",
    "providers",
    "hooks",
  ],
} as const;

// Export grouped constants as default
const constants = {
  app: appConfig,
  ascii: asciiArt,
  requirements,
  environment: environmentConfig,
  template: templateStructure,
} as const;

export default constants;

// Export individual items for backward compatibility
export const APP_INFO = appConfig;
export const ASCII_ART = asciiArt;
export const REQUIRED_NODE_VERSION = requirements.nodeVersion;
export const DOCKER_PORTS = requirements.dockerPorts;
export const ENVIRONMENT_FILES = environmentConfig.files;
export const REQUIRED_ENV_VARS = environmentConfig.requiredVars;
export const REQUIRED_LOCAL_ENV_VARS = environmentConfig.requiredLocalVars;
export const STRIPE_ENV_VARS = environmentConfig.stripeVars;
export const TEMPLATE_DIRECTORIES = templateStructure.directories;
export const CORE_FILES = templateStructure.coreFiles;
export const SOURCE_DIRECTORIES = templateStructure.sourceDirectories;
