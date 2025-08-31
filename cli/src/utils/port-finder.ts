import { exec } from "child_process";
import { promisify } from "util";
import logger from "./logger";

const execAsync = promisify(exec);

export interface PortAllocation {
  api: number;
  db: number;
  studio: number;
  inbucket: number;
  analytics: number;
  shadowDb: number;
}

const DEFAULT_PORTS: PortAllocation = {
  api: 54321,
  db: 54322,
  studio: 54323,
  inbucket: 54324,
  analytics: 54327,
  shadowDb: 54320,
};

/**
 * Check if a port is available on the system
 */
export const isPortAvailable = async (port: number): Promise<boolean> => {
  try {
    const isWindows = process.platform === "win32";

    if (isWindows) {
      // Windows: Use netstat to check if port is in use
      const { stdout } = await execAsync(`netstat -an | findstr :${port}`);
      return stdout.trim() === "";
    } else {
      // Unix/Linux/Mac: Use netstat or lsof
      try {
        const { stdout } = await execAsync(`lsof -i :${port}`);
        return stdout.trim() === "";
      } catch {
        // If lsof fails, try netstat
        const { stdout } = await execAsync(`netstat -an | grep :${port}`);
        return stdout.trim() === "";
      }
    }
  } catch {
    // If the command fails, assume port is available (safer than assuming busy)
    return true;
  }
};

/**
 * Find the next available port starting from a given port
 */
export const findNextAvailablePort = async (
  startPort: number,
  maxAttempts: number = 10,
): Promise<number> => {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(
    `Could not find an available port starting from ${startPort} (tried ${maxAttempts} ports)`,
  );
};

/**
 * Find available ports for all Supabase services
 */
export const findAvailablePorts = async (
  isRetry: boolean = false,
): Promise<PortAllocation> => {
  if (!isRetry) {
    logger.step("🔍 Checking port availability...");
  } else {
    logger.info("\n🔄 Re-checking port availability...");
  }

  const allocation: PortAllocation = {
    api: DEFAULT_PORTS.api,
    db: DEFAULT_PORTS.db,
    studio: DEFAULT_PORTS.studio,
    inbucket: DEFAULT_PORTS.inbucket,
    analytics: DEFAULT_PORTS.analytics,
    shadowDb: DEFAULT_PORTS.shadowDb,
  };

  const allocatedPorts = new Set<number>(); // Track allocated ports to avoid duplicates
  let conflictsFound = 0;

  // Check each port and find alternatives if needed
  for (const [service, defaultPort] of Object.entries(DEFAULT_PORTS)) {
    const isAvailable = await isPortAvailable(defaultPort);

    if (!isAvailable || allocatedPorts.has(defaultPort)) {
      conflictsFound++;

      try {
        // Find next available port that isn't already allocated
        let searchStart = defaultPort + 1;
        let newPort: number;

        do {
          newPort = await findNextAvailablePort(searchStart);
          searchStart = newPort + 1;
        } while (allocatedPorts.has(newPort));

        allocation[service as keyof PortAllocation] = newPort;
        allocatedPorts.add(newPort);

        logger.info(
          `  📍 ${service}: ${defaultPort} → ${newPort} (conflict resolved)`,
        );
      } catch (error) {
        logger.error(
          `❌ Could not find available port for ${service}: ${error}`,
        );
        throw new Error(`Port allocation failed for ${service}`);
      }
    } else {
      // Port is available, mark it as allocated
      allocatedPorts.add(defaultPort);
      logger.info(`  ✅ ${service}: ${defaultPort} (available)`);
    }
  }

  // Summary message
  if (conflictsFound > 0) {
    logger.success(
      `\n✅ Port allocation completed (${conflictsFound} conflicts resolved)`,
    );
  } else {
    logger.success("✅ All default ports are available");
  }

  return allocation;
};

/**
 * Check if any of the allocated ports conflict with running services
 */
export const validatePortAllocation = async (
  allocation: PortAllocation,
): Promise<{ isValid: boolean; conflicts: string[] }> => {
  const conflicts: string[] = [];

  for (const [service, port] of Object.entries(allocation)) {
    const isAvailable = await isPortAvailable(port);
    if (!isAvailable) {
      conflicts.push(`${service}: ${port}`);
    }
  }

  return {
    isValid: conflicts.length === 0,
    conflicts,
  };
};
