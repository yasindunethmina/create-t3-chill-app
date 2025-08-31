import { startContainers } from "../services/container-manager";
import { setupDatabase } from "../services/database-setup";
import { install } from "../services/dependency-installer";
import {
  checkEnvironmentFiles,
  validateEnvironmentFiles,
} from "../services/environment-validator";
import { showSetupInfo } from "../services/stripe-setup";
import type { CLIOptionsT, ProjectConfigT } from "../types";
import { updateEnvironmentTemplates } from "../utils/config-updater";
import logger from "../utils/logger";
import type { PortAllocation } from "../utils/port-finder";

const showSuccessMessage = (
  projectConfig: ProjectConfigT,
  portAllocation?: PortAllocation,
): void => {
  logger.success("\n🎉 Project setup completed successfully!\n");

  logger.info("Your T3 Chill App is ready! Here's what's been set up:");
  logger.list(
    [
      "✅ Dependencies installed",
      "✅ Supabase containers running",
      "✅ Database initialized with Prisma",
      "✅ Environment variables configured",
    ],
    "cyan",
  );

  if (portAllocation) {
    logger.info("\n🌐 Services are running on:");
    logger.list(
      [
        `API Server: http://127.0.0.1:${portAllocation.api}`,
        `Database: postgresql://postgres:postgres@127.0.0.1:${portAllocation.db}/postgres`,
        `Studio Dashboard: http://127.0.0.1:${portAllocation.studio}`,
        `Email Testing: http://127.0.0.1:${portAllocation.inbucket}`,
      ],
      "cyan",
    );
  }

  logger.step("🚀 Next steps:");
  logger.list(
    [`cd ${projectConfig.name}`, "npm run dev", "Open http://localhost:3000"],
    "cyan",
  );

  // Thank you message with social links
  logger.success("\n💙 Thank you for using Create T3 Chill App!\n");
  logger.info("If you like this project, please give it a ⭐️ on GitHub:");
  logger.cyan("   https://github.com/yasindunethmina/create-t3-chill-app\n");

  logger.info("Questions? Need help? I'm here for you!");
  logger.gray(
    "Reach out on social media - I'm also open for new opportunities:\n",
  );
  logger.list(
    [
      "𝕏 (Twitter): https://x.com/yasinduneth",
      "LinkedIn: https://www.linkedin.com/in/yasinduneth",
    ],
    "cyan",
  );

  logger.success("\nHappy building! 🚀\n");
};

const showCredits = (): void => {
  logger.printWelcome();

  logger.step("🙏 Credits & Resources");
  logger.info("Built with love using:");
  logger.list(
    [
      "Next.js - https://nextjs.org",
      "Tailwind CSS - https://tailwindcss.com",
      "Supabase - https://supabase.com",
      "tRPC - https://trpc.io",
      "Prisma - https://prisma.io",
      "Stripe - https://stripe.com",
    ],
    "cyan",
  );
};

const handleCriticalError = (err: unknown): void => {
  if (err instanceof Error) {
    logger.error(`\n❌ Setup failed: ${err.message}`);

    // Type-safe way to check for suggestions
    if ("suggestions" in err && Array.isArray(err.suggestions)) {
      logger.info("\n💡 Troubleshooting suggestions:");
      logger.list(err.suggestions.map((s: string) => `• ${s}`));
    }
  } else {
    logger.error(`\n❌ Setup failed: ${String(err)}`);
  }

  logger.info("\n🔄 You can try running the setup again with:");
  logger.list([
    "npm run dev (to start development)",
    "Or re-run this CLI to try setup again",
  ]);
};

export const setup = async (
  projectConfig: ProjectConfigT,
  options: CLIOptionsT,
): Promise<void> => {
  try {
    showCredits();

    // Install dependencies
    if (!options.skipInstall) {
      const installSuccess = await install(projectConfig.path);
      if (!installSuccess) {
        throw new Error("Failed to install dependencies");
      }
    }

    // Start containers
    const portAllocation = await startContainers(projectConfig.path);

    // Update environment templates with actual ports
    await updateEnvironmentTemplates(projectConfig.path, portAllocation);

    // Check and validate environment files
    await checkEnvironmentFiles(projectConfig.path);

    await validateEnvironmentFiles(projectConfig.path);

    // Setup database
    await setupDatabase(projectConfig.path);

    // Show Stripe setup info
    showSetupInfo();

    // Show success message
    showSuccessMessage(projectConfig, portAllocation);
  } catch (err) {
    handleCriticalError(err);
    throw err;
  }
};
