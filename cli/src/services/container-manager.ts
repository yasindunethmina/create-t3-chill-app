import { execSync } from "child_process";
import { createContainerError } from "../errors";
import commandRunner from "../utils/command-runner";
import {
  getCurrentPortAllocation,
  updateEnvironmentFiles,
  updateSupabaseConfig,
} from "../utils/config-updater";
import logger from "../utils/logger";
import {
  findAvailablePorts,
  validatePortAllocation,
  type PortAllocation,
} from "../utils/port-finder";

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

export const startContainers = async (
  projectPath: string,
): Promise<PortAllocation> => {
  logger.step("🐳 Starting Supabase containers...");

  // Check if containers are already running
  if (checkContainerStatus(projectPath)) {
    logger.success("✅ Supabase containers are already running");

    // Get current port allocation from config
    const currentAllocation = await getCurrentPortAllocation(projectPath);
    if (currentAllocation) {
      return currentAllocation;
    }
  }

  // Find available ports before starting containers
  const portAllocation = await findAvailablePorts();

  // Update Supabase configuration with allocated ports (config.toml now exists from template)
  await updateSupabaseConfig(projectPath, portAllocation);

  // Update environment files with new ports
  await updateEnvironmentFiles(projectPath, portAllocation);

  // Attempt to start containers with retry mechanism
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.info(
        `🚀 Starting containers (attempt ${attempt}/${maxRetries})...`,
      );

      // Validate ports are still available before starting
      const validation = await validatePortAllocation(portAllocation);
      if (!validation.isValid) {
        logger.warning(
          `⚠️  Port conflicts detected: ${validation.conflicts.join(", ")}`,
        );

        if (attempt < maxRetries) {
          logger.info("🔄 Finding new ports and retrying...");
          const newAllocation = await findAvailablePorts(true);
          await updateSupabaseConfig(projectPath, newAllocation);
          await updateEnvironmentFiles(projectPath, newAllocation);
          Object.assign(portAllocation, newAllocation);
          continue;
        }
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
        logger.success("\n✅ Supabase containers started successfully");

        // Verify containers are running
        if (!checkContainerStatus(projectPath)) {
          logger.warning("⚠️  Containers started but status check failed");
        }

        logger.step("🔗 Supabase setup completed");
        logger.info(`📍 Services running on:`);
        logger.list(
          [
            `API: http://127.0.0.1:${portAllocation.api}`,
            `Database: postgresql://postgres:postgres@127.0.0.1:${portAllocation.db}/postgres`,
            `Studio: http://127.0.0.1:${portAllocation.studio}`,
            `Inbucket: http://127.0.0.1:${portAllocation.inbucket}`,
          ],
          "cyan",
        );

        return portAllocation;
      } else {
        throw new Error("Supabase start command failed");
      }
    } catch (error) {
      lastError = error as Error;
      logger.warning(`\n⚠️  Attempt ${attempt} failed: ${lastError.message}`);

      if (attempt < maxRetries) {
        logger.info("🔄 Retrying with new port allocation...\n");

        // Stop any partially started containers
        try {
          commandRunner.runCommand("npx supabase stop", projectPath, {
            timeout: 30000,
          });
        } catch {
          // Ignore stop errors
        }

        // Find new ports for retry
        const newAllocation = await findAvailablePorts(true);
        await updateSupabaseConfig(projectPath, newAllocation);
        await updateEnvironmentFiles(projectPath, newAllocation);
        Object.assign(portAllocation, newAllocation);
      }
    }
  }

  // If all retries failed, provide helpful error message
  const suggestions = [
    "Ensure Docker Desktop is running",
    "Check if other applications are using the required ports",
    "Try manually running: npx supabase stop && npx supabase start",
    "Check Docker logs for more details",
    "Ensure no other Supabase instances are running",
  ];

  throw createContainerError(
    `Failed to start Supabase containers after ${maxRetries} attempts. Last error: ${lastError?.message}`,
    suggestions,
  );
};
