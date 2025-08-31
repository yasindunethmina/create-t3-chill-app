import { checkAllPrerequisites } from "../services/prerequisites";
import { createProject } from "../services/project-creator";
import { setup } from "../setup/project-setup";
import type { CLIOptionsT } from "../types";
import logger from "../utils/logger";

const showSkippedSetupMessage = (projectPath: string): void => {
  logger.success("\n✅ Project created successfully!\n");
  logger.info("Next steps:");
  logger.list([`cd ${projectPath}`, "npm install", "npm run dev"], "cyan");
  logger.gray("\nSetup was skipped. Please run the setup manually when ready.");

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

const handleError = (unknownError: unknown): void => {
  logger.error("\n❌ Critical error occurred:");

  if (unknownError instanceof Error) {
    logger.error(`   ${unknownError.message}`);

    // Add helpful context for common errors
    if (
      unknownError.message.includes("ENOENT") ||
      unknownError.message.includes("not found")
    ) {
      logger.info("\n💡 This might be due to:");
      logger.list([
        "Missing template files (run build script)",
        "Invalid project path",
        "File system permissions",
      ]);
    } else if (
      unknownError.message.includes("EACCES") ||
      unknownError.message.includes("permission")
    ) {
      logger.info("\n💡 Permission denied. Try:");
      logger.list([
        "Running with appropriate permissions",
        "Checking directory permissions",
      ]);
    } else if (
      unknownError.message.includes("network") ||
      unknownError.message.includes("timeout")
    ) {
      logger.info("\n💡 Network issue. Please:");
      logger.list([
        "Check your internet connection",
        "Try again in a few moments",
      ]);
    }
  } else {
    logger.error(`   ${String(unknownError)}`);
  }

  logger.info("\n🔄 You can try running the command again.");
  process.exit(1);
};

export const execute = async (
  projectName?: string,
  options: CLIOptionsT = {},
): Promise<void> => {
  try {
    // Check prerequisites
    await checkAllPrerequisites();

    // Create project
    const projectConfig = await createProject(projectName, options);

    // Setup project (install dependencies, start containers, etc.)
    if (!options.skipSetup) {
      await setup(projectConfig, options);
    } else {
      showSkippedSetupMessage(projectConfig.path);
    }
  } catch (unknownError) {
    handleError(unknownError);
  }
};
