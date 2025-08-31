import { execSync } from "child_process";
import { createContainerError } from "../errors";
import commandRunner from "../utils/command-runner";
import logger from "../utils/logger";

export const checkContainerStatus = (projectPath: string): boolean => {
  try {
    execSync("npx supabase status", {
      cwd: projectPath,
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
};

export const startContainers = async (projectPath: string): Promise<void> => {
  logger.step("🐳 Starting Supabase containers...");

  // Check if containers are already running
  if (checkContainerStatus(projectPath)) {
    logger.success("✅ Supabase containers are already running");
    return;
  }

  // Start containers
  const startSuccess = commandRunner.runCommand(
    "npx supabase start",
    projectPath,
    {
      timeout: 120000, // 2 minutes for container operations
    },
  );

  if (startSuccess) {
    logger.success("✅ Supabase containers started successfully");

    // Verify containers are running
    if (!checkContainerStatus(projectPath)) {
      logger.warning("⚠️  Containers started but status check failed");
    }
  } else {
    const suggestions = [
      "Ensure Docker Desktop is running",
      "Check if ports 54321, 54322, 54323, 54324 are available",
      "Try: npx supabase stop && npx supabase start",
      "Check Docker logs for more details",
    ];

    throw createContainerError(
      "Failed to start Supabase containers",
      suggestions,
    );
  }

  logger.step("🔗 Supabase setup completed");
};
