import { z } from "zod";

// Database environment variables (from .env - server only)
const database = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
});

// Server-side environment variables (from .env.local - server only)
const server = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Stripe (optional)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

// Client-side environment variables (from .env.local - available on both server and client)
const client = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY: z.string().min(1),

  // App configuration
  NEXT_PUBLIC_APP_URL: z.string().min(1).default("http://localhost:3000"),

  // Stripe (optional)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_ID: z.string().optional(),
});

// Validate and create typed environment object
function createEnv() {
  const isServer = typeof window === "undefined";

  // Always validate client variables (available in both server and client)
  const clientEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
  };

  const _client = client.safeParse(clientEnv);

  if (!_client.success) {
    console.error("❌ Invalid client environment variables:");
    _client.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    });
    throw new Error("Invalid client environment variables");
  }

  // Only validate server variables on the server
  if (isServer) {
    const databaseEnv = {
      DATABASE_URL: process.env.DATABASE_URL,
      DIRECT_URL: process.env.DIRECT_URL,
    };

    const serverEnv = {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    };

    const _database = database.safeParse(databaseEnv);
    const _server = server.safeParse(serverEnv);

    if (!_database.success) {
      console.error("❌ Invalid database environment variables:");
      _database.error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
      throw new Error("Invalid database environment variables");
    }

    if (!_server.success) {
      console.error("❌ Invalid server environment variables:");
      _server.error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
      throw new Error("Invalid server environment variables");
    }

    return {
      ..._database.data,
      ..._server.data,
      ..._client.data,
    };
  }

  // Client-side: only return client variables
  return _client.data;
}

export const env = createEnv();

// Type for server environment (all variables)
type ServerEnv = z.infer<typeof database> &
  z.infer<typeof server> &
  z.infer<typeof client>;

// Type for client environment (only client variables)
type ClientEnv = z.infer<typeof client>;

// Server-only environment access (throws error if called on client)
export function serverEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("serverEnv() can only be called on the server side");
  }
  return env as ServerEnv;
}

// Utility functions
export const isStripeConfigured = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // Server-side: check all Stripe variables
    const server = serverEnv();
    return !!(
      server.STRIPE_SECRET_KEY &&
      server.STRIPE_WEBHOOK_SECRET &&
      server.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
      server.NEXT_PUBLIC_STRIPE_PRICE_ID
    );
  } else {
    // Client-side: only check client variables
    const client = env as ClientEnv;
    return !!(
      client.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
      client.NEXT_PUBLIC_STRIPE_PRICE_ID
    );
  }
};
