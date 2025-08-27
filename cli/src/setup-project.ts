import chalk from "chalk";
import { spawn } from "child_process";
import ora from "ora";
import { CLIOptionsT } from "./create-project.js";

// --- ASCII Art ---
const asciiArt = `
█▀▀ █▀▀█ █▀▀ █▀▀█ ▀▀█▀▀ █▀▀ ░░ ▀▀█▀▀ █▀▀█ ░░ █▀▀ █░░█ ░▀░ █░░ █░░ ░░ █▀▀█ █▀▀█ █▀▀█ 
█░░ █▄▄▀ █▀▀ █▄▄█ ░░█░░ █▀▀ ▀▀ ░░█░░ ░░▀▄ ▀▀ █░░ █▀▀█ ▀█▀ █░░ █░░ ▀▀ █▄▄█ █░░█ █░░█ 
▀▀▀ ▀░▀▀ ▀▀▀ ▀░░▀ ░░▀░░ ▀▀▀ ░░ ░░▀░░ █▄▄█ ░░ ▀▀▀ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀ ░░ ▀░░▀ █▀▀▀ █▀▀▀
`;
function printWelcome() {
  console.log(chalk.cyan.bold(asciiArt));
  console.log(chalk.magenta.bold("Welcome to Create T3 Chill App! 🚀\n"));
  console.log(
    chalk.gray(
      "The fastest way to ship products with Next.js, Supabase, tRPC, Prisma, and Stripe.\n",
    ),
  );
}

// --- Utility: Run a shell command with spinner ---
function runCommandAsync(
  command: string,
  cwd: string,
  description: string,
): Promise<boolean> {
  const spinner = ora(description).start();
  const [cmd, ...args] = command.split(" ");

  return new Promise((resolve) => {
    const proc = spawn(cmd, args, {
      cwd,
      shell: true,
      stdio: "inherit",
    });

    proc.on("close", (code) => {
      if (code === 0) {
        spinner.succeed(description);
        resolve(true);
      } else {
        spinner.fail(description);
        resolve(false);
      }
    });

    proc.on("error", () => {
      spinner.fail(description);
      resolve(false);
    });
  });
}

// --- Step 1: Install dependencies ---
async function installDependencies(cwd: string): Promise<boolean> {
  console.log(chalk.blue.bold("\n📦 Installing dependencies...\n"));
  return await runCommandAsync("npm install", cwd, "Installing packages");
}

// --- Step 2: Start Supabase containers ---
async function checkContainerStatus(cwd: string): Promise<boolean> {
  try {
    const { execSync } = await import("child_process");
    const output = execSync("npx supabase status", {
      cwd,
      stdio: "pipe",
      encoding: "utf8",
    });
    return output.includes("Running");
  } catch {
    return false;
  }
}

async function startContainers(cwd: string): Promise<boolean> {
  console.log(chalk.blue.bold("\n🐳 Starting local Supabase containers...\n"));

  if (await checkContainerStatus(cwd)) {
    console.log(
      chalk.yellow("⚠️  Containers are already running, skipping..."),
    );
    return true;
  }

  const success = await runCommandAsync(
    "npx supabase start",
    cwd,
    "Starting Supabase containers ",
  );
  if (!success) {
    console.log(chalk.red("❌ Failed to start containers"));
    console.log(
      chalk.yellow("   Please check Docker is running and try again"),
    );
    return false;
  }

  console.log(chalk.green("✅ Containers started successfully"));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return true;
}

// --- Step 3: Check environment files ---
async function checkEnvironmentFiles(cwd: string): Promise<boolean> {
  console.log(chalk.blue.bold("\n📝 Checking environment files...\n"));

  try {
    const fs = await import("fs/promises");
    const path = await import("path");

    const envPath = path.join(cwd, ".env");
    const envLocalPath = path.join(cwd, ".env.local");

    const envExists = await fs
      .access(envPath)
      .then(() => true)
      .catch(() => false);
    const envLocalExists = await fs
      .access(envLocalPath)
      .then(() => true)
      .catch(() => false);

    if (!envExists) {
      console.log(chalk.red("❌ .env file not found"));
      console.log(
        chalk.yellow(
          "   Environment files should have been copied during project creation",
        ),
      );
      return false;
    }

    if (!envLocalExists) {
      console.log(chalk.red("❌ .env.local file not found"));
      console.log(
        chalk.yellow(
          "   Environment files should have been copied during project creation",
        ),
      );
      return false;
    }

    console.log(chalk.green("✅ Environment files found"));
    console.log(
      chalk.gray("   Please update the placeholder values with real data"),
    );
    console.log(
      chalk.gray("   For [LOCAL_ANON_KEY], get it from 'npx supabase status'"),
    );
    console.log(
      chalk.gray(
        "   Stripe keys are optional but required for payment features",
      ),
    );

    return true;
  } catch {
    console.log(chalk.red("❌ Failed to check environment files"));
    return false;
  }
}

// --- Step 4: Validate environment file content ---
async function validateRequiredEnvironmentContent(
  cwd: string,
): Promise<{ isValid: boolean; issues: string[] }> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");

    const issues: string[] = [];
    const envPath = path.join(cwd, ".env");
    const envContent = await fs.readFile(envPath, "utf8");

    if (envContent.includes("#")) {
      issues.push(".env file contains comments - Prisma cannot parse these");
    }

    const requiredEnvVars = ["DATABASE_URL", "DIRECT_URL"];
    for (const varName of requiredEnvVars) {
      if (!envContent.includes(`${varName}=`)) {
        issues.push(`.env file missing required variable: ${varName}`);
      }
    }

    const envLocalPath = path.join(cwd, ".env.local");
    const envLocalContent = await fs.readFile(envLocalPath, "utf8");

    const requiredLocalVars = [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
    ];
    for (const varName of requiredLocalVars) {
      if (!envLocalContent.includes(`${varName}=`)) {
        issues.push(`.env.local file missing required variable: ${varName}`);
      }
    }

    if (envLocalContent.includes("[LOCAL_ANON_KEY]")) {
      issues.push(
        ".env.local file has placeholder anon key - please update with actual key from above container status",
      );
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  } catch {
    return {
      isValid: false,
      issues: ["Failed to read or parse environment files"],
    };
  }
}

async function validateStripeConfiguration(
  cwd: string,
): Promise<{ isValid: boolean; missingVars: string[] }> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");

    const missingVars: string[] = [];
    const envLocalPath = path.join(cwd, ".env.local");
    const envLocalContent = await fs.readFile(envLocalPath, "utf8");

    const stripeVars = [
      "STRIPE_SECRET_KEY",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_STRIPE_PRICE_ID",
      "STRIPE_WEBHOOK_SECRET",
    ];
    for (const varName of stripeVars) {
      if (
        envLocalContent.includes(`[${varName}]`) ||
        !envLocalContent.match(new RegExp(`^${varName}=`, "m"))
      ) {
        missingVars.push(varName);
      }
    }

    return {
      isValid: missingVars.length === 0,
      missingVars,
    };
  } catch {
    return {
      isValid: false,
      missingVars: ["Failed to read or parse .env.local"],
    };
  }
}

async function validateEnvironmentFiles(cwd: string): Promise<boolean> {
  console.log(chalk.blue.bold("\n🔍 Validating environment files...\n"));

  try {
    const fs = await import("fs/promises");
    const path = await import("path");

    const envPath = path.join(cwd, ".env");
    const envLocalPath = path.join(cwd, ".env.local");

    if (
      !(await fs
        .access(envPath)
        .then(() => true)
        .catch(() => false))
    ) {
      console.log(chalk.red("❌ .env file not found"));
      return false;
    }

    if (
      !(await fs
        .access(envLocalPath)
        .then(() => true)
        .catch(() => false))
    ) {
      console.log(chalk.red("❌ .env.local file not found"));
      return false;
    }

    // Step 1: Validate required environment variables (blocking)
    console.log(
      chalk.blue.bold(
        "\n🔍 Step 1: Validating required environment variables...\n",
      ),
    );

    let requiredValidationPassed = false;
    while (!requiredValidationPassed) {
      const requiredValidationResult =
        await validateRequiredEnvironmentContent(cwd);

      if (requiredValidationResult.isValid) {
        requiredValidationPassed = true;
        console.log(
          chalk.green(
            "✅ Required environment variables validated successfully",
          ),
        );
      } else {
        console.log(chalk.red("❌ Required environment validation failed"));
        console.log(chalk.yellow("   Please fix the following issues:"));
        for (const issue of requiredValidationResult.issues) {
          console.log(chalk.red(`   - ${issue}`));
        }
        console.log(
          chalk.gray("\nPress any key when you've fixed the issues..."),
        );
        await new Promise((resolve) => {
          process.stdin.setRawMode(true);
          process.stdin.resume();
          process.stdin.once("data", () => {
            process.stdin.setRawMode(false);
            resolve(undefined);
          });
        });
      }
    }

    // Step 2: Stripe configuration (optional, non-blocking)
    console.log(
      chalk.blue.bold("\n🔍 Step 2: Checking Stripe configuration...\n"),
    );
    let stripeValidationResult = await validateStripeConfiguration(cwd);

    if (!stripeValidationResult.isValid) {
      console.log(chalk.yellow("⚠️  Stripe configuration incomplete"));
      console.log(chalk.gray("   Missing the following required variables:"));
      for (const varName of stripeValidationResult.missingVars) {
        console.log(chalk.red(`   - ${varName}`));
      }
      console.log(
        chalk.gray("   Stripe features will not work without these variables"),
      );
      console.log(chalk.blue.bold("\n🤔 Do you want to configure Stripe now?"));
      console.log(
        chalk.gray(
          "   Press 'y' or Enter to configure Stripe, 'n' to skip and continue...",
        ),
      );

      let continueStripe = true;
      const response = await new Promise<string>((resolve) => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.once("data", (data) => {
          process.stdin.setRawMode(false);
          resolve(data.toString().toLowerCase());
        });
      });

      if (response === "n" || response === "no") {
        continueStripe = false;
      }

      while (continueStripe) {
        console.log(
          chalk.blue(
            "   Please add your Stripe keys to .env.local and press any key when ready...",
          ),
        );
        console.log(
          chalk.gray(
            "   Or press 'n' to skip Stripe configuration and continue...",
          ),
        );

        const configResponse = await new Promise<string>((resolve) => {
          process.stdin.setRawMode(true);
          process.stdin.resume();
          process.stdin.once("data", (data) => {
            process.stdin.setRawMode(false);
            resolve(data.toString().toLowerCase());
          });
        });

        if (configResponse === "n" || configResponse === "no") {
          console.log(
            chalk.gray("   Skipping Stripe configuration and continuing..."),
          );
          break;
        }

        stripeValidationResult = await validateStripeConfiguration(cwd);
        if (stripeValidationResult.isValid) {
          console.log(chalk.green("✅ Stripe configuration now complete"));
          break;
        } else {
          console.log(chalk.red("❌ Stripe configuration still incomplete"));
          console.log(
            chalk.gray("   Missing the following required variables:"),
          );
          for (const varName of stripeValidationResult.missingVars) {
            console.log(chalk.red(`   - ${varName}`));
          }
          console.log(
            chalk.blue("   Please fix the configuration and try again"),
          );
          console.log(
            chalk.gray(
              "   Or press 'n' to skip Stripe configuration and continue...",
            ),
          );
        }
      }
    } else {
      console.log(chalk.green("✅ Stripe configuration found"));
    }

    return true;
  } catch {
    console.log(chalk.red("❌ Failed to validate environment files"));
    return false;
  }
}

// --- Step 5: Setup database ---
async function setupDatabase(cwd: string): Promise<boolean> {
  console.log(chalk.blue.bold("\n🗄️  Setting up database...\n"));

  try {
    // Generate Prisma client (optional, but safe to keep)
    const generateSuccess = await runCommandAsync(
      "npm run prisma:generate",
      cwd,
      "Generating Prisma client",
    );

    if (!generateSuccess) {
      console.log(
        chalk.yellow(
          "⚠️  Prisma client generation failed, trying to continue...",
        ),
      );
    }

    // Check if migrations exist and are valid
    const fs = await import("fs/promises");
    const path = await import("path");

    const migrationsDir = path.join(cwd, "prisma", "migrations");
    const migrations = await fs.readdir(migrationsDir);

    let hasValidMigrations = false;
    for (const migration of migrations) {
      const migrationPath = path.join(migrationsDir, migration);
      const migrationFiles = await fs.readdir(migrationPath);
      if (migrationFiles.includes("migration.sql")) {
        hasValidMigrations = true;
        break;
      }
    }

    if (!hasValidMigrations) {
      console.log(chalk.red("❌ No valid migration files found"));
      console.log(
        chalk.yellow(
          "   This usually means the template wasn't built correctly",
        ),
      );
      console.log(chalk.yellow("   Please rebuild the CLI template"));
      return false;
    }

    // Run prisma:reset
    console.log(
      chalk.blue(
        "   Running Prisma reset (this will prompt for confirmation)...",
      ),
    );
    const resetSuccess = await runCommandAsync(
      "npm run prisma:reset -- --force",
      cwd,
      "Resetting database schema",
    );

    if (resetSuccess) {
      console.log(chalk.green("✅ Database setup completed"));
      return true;
    } else {
      console.log(chalk.red("❌ Failed to reset database"));
      console.log(chalk.yellow("   Please try running:"));
      console.log(chalk.cyan("   npm run prisma:reset -- --force"));
      return false;
    }
  } catch {
    console.log(chalk.red("❌ Failed to setup database"));
    console.log(chalk.yellow("   You can manually complete the setup:"));
    console.log(chalk.cyan("   npm run prisma:generate"));
    console.log(chalk.cyan("   npm run prisma:reset -- --force"));
    return false;
  }
}

// --- Step 6: Stripe info ---
async function setupStripe(): Promise<void> {
  console.log(chalk.blue.bold("\n💳 Setting up Stripe integration...\n"));

  console.log(chalk.gray("To enable Stripe functionality:"));
  console.log(chalk.cyan("  1. Create a Stripe account at https://stripe.com"));
  console.log(chalk.cyan("  2. Get your API keys from the Stripe dashboard"));
  console.log(chalk.cyan("  3. Update your .env.local file with the keys"));
  console.log(chalk.cyan("  4. Install Stripe CLI and run:"));
  console.log(chalk.cyan("     stripe login"));
  console.log(
    chalk.cyan(
      "     stripe listen --forward-to localhost:3000/api/stripe/webhook",
    ),
  );
  console.log(
    chalk.gray("\nThis step is optional and can be completed later.\n"),
  );
}

// --- Main orchestrator ---
export async function setupProject(
  projectPath: string,
  options?: CLIOptionsT,
): Promise<void> {
  printWelcome();

  // 1. Install dependencies (non-critical)
  if (!options?.skipInstall) {
    const depsSuccess = await installDependencies(projectPath);
    if (!depsSuccess) {
      console.log(
        chalk.yellow(
          "⚠️  Dependency installation failed. You can retry manually later.",
        ),
      );
    }
  }

  // 2. Start containers (critical)
  const containersSuccess = await startContainers(projectPath);
  if (!containersSuccess) {
    console.log(
      chalk.red(
        "❌ Docker/Supabase containers could not be started. Setup cannot continue.",
      ),
    );
    process.exit(1);
  }

  // 3. Check environment files (critical)
  const envFilesExist = await checkEnvironmentFiles(projectPath);
  if (!envFilesExist) {
    console.log(
      chalk.red(
        "❌ Required environment files are missing. Setup cannot continue.",
      ),
    );
    process.exit(1);
  }

  // 4. Validate environment files (critical)
  const envValidationSuccess = await validateEnvironmentFiles(projectPath);
  if (!envValidationSuccess) {
    console.log(
      chalk.red(
        "❌ Required environment variables are missing or invalid. Setup cannot continue.",
      ),
    );
    process.exit(1);
  }

  // 5. Setup database (critical)
  const dbSuccess = await setupDatabase(projectPath);
  if (!dbSuccess) {
    console.log(chalk.red("❌ Database setup failed. Setup cannot continue."));
    process.exit(1);
  }

  // 6. Setup Stripe info (non-critical)
  await setupStripe();

  // Final next steps
  console.log(chalk.green.bold("\n✅ Project setup completed successfully!\n"));
  console.log(chalk.white("Next steps:"));
  console.log(chalk.cyan(`  cd ${projectPath}`));
  if (!options?.skipSetup) {
    console.log(chalk.cyan("  npm run dev"));
    console.log(
      chalk.gray("\nYour app will be available at http://localhost:3000"),
    );
  } else {
    console.log(chalk.cyan("  npm install"));
    console.log(chalk.cyan("  npm run dev"));
  }
  console.log(
    chalk.gray("\nFor detailed setup instructions, visit your app's homepage!"),
  );
  console.log(chalk.gray("Happy coding! 🚀\n"));

  console.log(
    chalk.magenta(
      "If you enjoy using this project, please consider giving it a ⭐️ on GitHub!\n",
    ),
  );
  console.log(
    chalk.cyan(
      "💬 I'm open to work and happy to connect!\nFeel free to reach out:\n",
    ),
  );
  console.log(chalk.cyan("  X (Twitter): https://x.com/yasinduneth"));
  console.log(chalk.cyan("  LinkedIn:   https://linkedin.com/in/yasinduneth"));
  console.log(
    chalk.gray("\nThank you for building with Create T3 Chill App! 🙏\n"),
  );
}
