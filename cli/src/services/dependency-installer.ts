import commandRunner from "../utils/command-runner";
import logger from "../utils/logger";

export const install = async (projectPath: string): Promise<boolean> => {
  logger.step("📦 Installing dependencies...");

  const success = commandRunner.runCommand("npm install", projectPath, {
    timeout: 300000, // 5 minutes for npm install
  });

  if (success) {
    logger.step("✅ Dependencies installed successfully");
  } else {
    logger.error("❌ Failed to install dependencies");
    logger.error("  Try running: npm install manually");
    logger.error("  Common issues:");
    logger.error("    • Check internet connection");
    logger.error("    • Clear npm cache: npm cache clean --force");
    logger.error("    • Delete node_modules and package-lock.json");
  }

  return success;
};

export const generatePrismaClient = async (
  projectPath: string,
): Promise<boolean> => {
  const success = commandRunner.runCommand(
    "npm run prisma:generate",
    projectPath,
  );

  if (!success) {
    logger.error("❌ Failed to generate Prisma client");
    logger.error("  Try running: npm run prisma:generate manually");
    logger.error("  Make sure Prisma schema is valid");
  }

  return success;
};

export const resetDatabase = async (projectPath: string): Promise<boolean> => {
  logger.step("🗄️  Resetting database...");

  const success = commandRunner.runCommand(
    "npm run prisma:reset -- --force",
    projectPath,
  );

  if (!success) {
    logger.error("❌ Failed to reset database");
    logger.error("  Try running: npm run prisma:reset manually");
    logger.error("  Make sure database connection is working");
  }

  return success;
};
