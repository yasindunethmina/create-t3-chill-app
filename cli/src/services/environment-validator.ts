import { readFile } from "fs/promises";
import { join } from "path";
import {
  REQUIRED_ENV_VARS,
  REQUIRED_LOCAL_ENV_VARS,
  STRIPE_ENV_VARS,
} from "../constants";
import { createEnvironmentError } from "../errors";
import type {
  EnvironmentCheckResultT,
  EnvironmentValidationResultT,
} from "../types";
import fileSystem from "../utils/file-system";
import logger from "../utils/logger";
import terminal from "../utils/terminal";

export const checkEnvironmentVariables = async (
  projectPath: string,
): Promise<EnvironmentCheckResultT> => {
  try {
    const envPath = join(projectPath, ".env");
    const envLocalPath = join(projectPath, ".env.local");

    const envContent = await readFile(envPath, "utf8");
    const envLocalContent = await readFile(envLocalPath, "utf8");

    const requiredMissing: string[] = [];
    const optionalMissing: string[] = [];
    const placeholderVars: string[] = [];

    // Check required .env variables
    for (const varName of REQUIRED_ENV_VARS) {
      if (!envContent.includes(`${varName}=`)) {
        requiredMissing.push(`${varName} (in .env)`);
      }
    }

    // Check required .env.local variables
    for (const varName of REQUIRED_LOCAL_ENV_VARS) {
      if (!envLocalContent.includes(`${varName}=`)) {
        requiredMissing.push(`${varName} (in .env.local)`);
      }
    }

    // Check optional Stripe variables
    for (const varName of STRIPE_ENV_VARS) {
      if (!envLocalContent.includes(`${varName}=`)) {
        optionalMissing.push(`${varName} (in .env.local)`);
      }
    }

    // Check for placeholders
    const placeholders = [
      "[LOCAL_ANON_KEY]",
      "[NEXT_PUBLIC_SUPABASE_URL]",
      "[NODE_ENV]",
      "[STRIPE_SECRET_KEY]",
      "[NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY]",
      "[NEXT_PUBLIC_STRIPE_PRICE_ID]",
      "[STRIPE_WEBHOOK_SECRET]",
    ];

    for (const placeholder of placeholders) {
      if (envLocalContent.includes(placeholder)) {
        const varName = placeholder.replace(/[\[\]]/g, "");
        placeholderVars.push(varName);
      }
    }

    return {
      requiredMissing,
      optionalMissing,
      hasPlaceholders: placeholderVars.length > 0,
      placeholderVars,
    };
  } catch {
    throw createEnvironmentError("Failed to read environment files", [
      "Ensure .env and .env.local files exist",
      "Check file permissions",
    ]);
  }
};

export const validateRequiredEnvironmentContent = async (
  projectPath: string,
): Promise<EnvironmentValidationResultT> => {
  try {
    const check = await checkEnvironmentVariables(projectPath);
    const issues: string[] = [];

    // Add required variable issues
    if (check.requiredMissing.length > 0) {
      issues.push(
        `Missing required environment variables: ${check.requiredMissing.join(", ")}`,
      );
    }

    // Add placeholder issues for required variables
    const requiredPlaceholders = check.placeholderVars.filter(
      (var_) =>
        var_ === "LOCAL_ANON_KEY" ||
        REQUIRED_LOCAL_ENV_VARS.some((req) =>
          var_.includes(req.replace("NEXT_PUBLIC_", "")),
        ),
    );

    if (requiredPlaceholders.length > 0) {
      issues.push(
        `Required variables have placeholder values: ${requiredPlaceholders.join(", ")}`,
      );
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return {
      isValid: false,
      issues: ["Failed to validate environment variables"],
    };
  }
};

export const copyMissingEnvFiles = async (
  projectPath: string,
): Promise<void> => {
  const envFiles = [".env", ".env.local"];

  for (const envFile of envFiles) {
    const envExamplePath = join(projectPath, `${envFile}.example`);

    if (!(await fileSystem.fileExists(envExamplePath))) {
      logger.warning(`⚠️  Missing ${envFile}.example file`);
    } else {
      await fileSystem.copyFiles(
        [`${envFile}.example`],
        projectPath,
        projectPath,
      );
      logger.success(`✅ Copied ${envFile}.example to ${envFile}`);
    }
  }
};

export const checkEnvironmentFiles = async (
  projectPath: string,
): Promise<void> => {
  logger.step("📋 Checking environment files...");

  const envPath = join(projectPath, ".env");
  const envLocalPath = join(projectPath, ".env.local");

  if (
    !(await fileSystem.fileExists(envPath)) ||
    !(await fileSystem.fileExists(envLocalPath))
  ) {
    logger.warning("🔧 Environment files missing, copying from examples...");
    await copyMissingEnvFiles(projectPath);
    logger.success("✅ Environment files created from examples");
  } else {
    logger.success("✅ Environment files found");
  }
};

const validateRequiredVariables = async (
  projectPath: string,
): Promise<void> => {
  const check = await checkEnvironmentVariables(projectPath);

  // Collect all required variable issues
  const allRequiredIssues: string[] = [];

  // Add missing variables
  allRequiredIssues.push(...check.requiredMissing);

  // Add required variables with placeholders
  const requiredPlaceholders = check.placeholderVars.filter(
    (var_) =>
      var_ === "LOCAL_ANON_KEY" ||
      var_ === "NEXT_PUBLIC_SUPABASE_URL" ||
      var_ === "NODE_ENV",
  );

  if (requiredPlaceholders.length > 0) {
    allRequiredIssues.push(
      ...requiredPlaceholders.map((var_) => `${var_} (has placeholder value)`),
    );
  }

  // If there are any required variable issues, show them all together
  if (allRequiredIssues.length > 0) {
    logger.error("❌ Required environment variables need attention:");
    logger.list(
      allRequiredIssues.map((issue) => `• ${issue}`),
      "yellow",
    );

    logger.info("\n🙌 These variables are required for the app to function:");
    logger.list(
      [
        "DATABASE_URL - Database connection string (in .env)",
        "DIRECT_URL - Direct database connection (in .env)",
        "NEXT_PUBLIC_SUPABASE_URL - Supabase project URL (in .env.local)",
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY - Supabase anon key (in .env.local)",
        "NODE_ENV - Environment mode (in .env.local)",
      ],
      "cyan",
    );

    if (requiredPlaceholders.length > 0) {
      logger.info("\n💡 For placeholder values:");
      logger.list(
        [
          "LOCAL_ANON_KEY - Get from Supabase container status above",
          "NEXT_PUBLIC_SUPABASE_URL - Usually http://127.0.0.1:54321 for local",
          "NODE_ENV - Set to 'development' for local development",
        ],
        "cyan",
      );
    }

    logger.warning(
      "\n⏳ Please update your environment files and press any key to retry...",
    );
    await terminal.waitForUserInput();

    // Retry validation
    return validateRequiredVariables(projectPath);
  }

  logger.success("✅ Required environment variables validated");
};

const validateOptionalVariables = async (
  projectPath: string,
): Promise<void> => {
  const check = await checkEnvironmentVariables(projectPath);

  // Check for any missing Stripe variables or placeholders
  const stripeIssues: string[] = [];

  // Add missing Stripe variables
  stripeIssues.push(...check.optionalMissing);

  // Add Stripe variables with placeholders
  const stripePlaceholders = check.placeholderVars.filter(
    (var_) =>
      var_ === "STRIPE_SECRET_KEY" ||
      var_ === "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" ||
      var_ === "NEXT_PUBLIC_STRIPE_PRICE_ID" ||
      var_ === "STRIPE_WEBHOOK_SECRET",
  );

  if (stripePlaceholders.length > 0) {
    stripeIssues.push(
      ...stripePlaceholders.map((var_) => `${var_} (has placeholder value)`),
    );
  }

  // Always check and warn about Stripe variables if any are missing/incomplete
  if (stripeIssues.length > 0) {
    logger.warning(
      "\n⚠️  Optional Stripe environment variables need attention:",
    );
    logger.list(
      stripeIssues.map((issue) => `• ${issue}`),
      "yellow",
    );

    logger.info("\n💡 Stripe integration is optional and includes:");
    logger.list(
      [
        "Payment processing and subscriptions",
        "Protected content based on subscription status",
        "Webhook handling for real-time updates",
      ],
      "cyan",
    );

    logger.info("\nTo set up Stripe (optional):");
    logger.list(
      [
        "1. Create a Stripe account at https://stripe.com",
        "2. Get your secret and publishable keys from the dashboard",
        "3. Create a product and get the price ID",
        "4. Set up webhooks and get the webhook secret",
        "5. Add all keys to your .env.local file",
      ],
      "cyan",
    );

    logger.info("\nRequired Stripe variables for full integration:");
    logger.list(
      [
        "STRIPE_SECRET_KEY - Your secret key (in .env.local)",
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY - Your publishable key (in .env.local)",
        "NEXT_PUBLIC_STRIPE_PRICE_ID - Product price ID (in .env.local)",
        "STRIPE_WEBHOOK_SECRET - Webhook endpoint secret (in .env.local)",
      ],
      "gray",
    );

    logger.warning("\n❓ Do you want to continue without Stripe? (Y/n)");
    const shouldContinue = await terminal.askYesNo(true);

    if (!shouldContinue) {
      logger.warning(
        "\n⏳ Please add your Stripe environment variables and press any key to retry...",
      );
      await terminal.waitForUserInput();

      // Retry Stripe validation
      return validateOptionalVariables(projectPath);
    }

    logger.info("✅ Continuing without Stripe integration");
  } else {
    logger.success("✅ Stripe environment variables found");
  }
};

export const validateEnvironmentFiles = async (
  projectPath: string,
): Promise<void> => {
  logger.step("🔧 Validating environment variables...");

  // First, ensure all required variables are present and valid
  await validateRequiredVariables(projectPath);

  // Then, check optional Stripe variables and give user choice
  await validateOptionalVariables(projectPath);

  logger.success("✅ Environment setup completed");
};
