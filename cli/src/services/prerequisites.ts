import { execSync } from "child_process";
import { REQUIRED_NODE_VERSION } from "../constants";
import type { PrerequisiteCheckT } from "../types";
import logger from "../utils/logger";
import terminal from "../utils/terminal";
import validation from "../utils/validation";

export const checkNodeVersion = (): PrerequisiteCheckT => {
  const nodeVersion = process.version;
  const { isValid } = validation.validateNodeVersion(
    nodeVersion,
    REQUIRED_NODE_VERSION,
  );

  const issues: string[] = [];

  if (!isValid) {
    issues.push(
      `Node.js version is too old (${nodeVersion}). Please install Node.js ${REQUIRED_NODE_VERSION} or higher.`,
      "Download from: https://nodejs.org/",
    );
  }

  return {
    isValid,
    version: nodeVersion,
    issues,
  };
};

export const checkDockerInstallation = (): PrerequisiteCheckT => {
  const issues: string[] = [];

  try {
    execSync("docker --version", { stdio: "pipe" });
    return { isValid: true, issues: [] };
  } catch {
    issues.push(
      "Docker is not installed.",
      "Please install Docker Desktop from: https://docker.com",
      "After installation, ensure Docker Desktop is running.",
    );
    return { isValid: false, issues };
  }
};

export const checkDockerRunning = (): PrerequisiteCheckT => {
  const issues: string[] = [];

  try {
    execSync("docker info", { stdio: "pipe" });
    return { isValid: true, isRunning: true, issues: [] };
  } catch {
    issues.push(
      "Docker is installed but not running.",
      "Please start Docker Desktop and try again.",
    );
    return { isValid: false, isRunning: false, issues };
  }
};

export const checkAllPrerequisites = async (): Promise<void> => {
  logger.step("🔍 Checking prerequisites...");

  let allPrerequisitesMet = false;

  while (!allPrerequisitesMet) {
    let hasIssues = false;
    const allIssues: string[] = [];

    // Check Node.js version
    const nodeCheck = checkNodeVersion();
    if (nodeCheck.isValid) {
      logger.success(`✅ Node.js version: ${nodeCheck.version}`);
    } else {
      logger.error(`❌ Node.js version: ${nodeCheck.version}`);
      hasIssues = true;
      allIssues.push(...nodeCheck.issues);
    }

    // Check Docker installation
    const dockerInstallCheck = checkDockerInstallation();
    if (dockerInstallCheck.isValid) {
      logger.success("✅ Docker: Installed");

      // Only check if Docker is running if it's installed
      const dockerRunningCheck = checkDockerRunning();
      if (dockerRunningCheck.isRunning) {
        logger.success("✅ Docker: Running");
      } else {
        logger.error("❌ Docker: Not running");
        hasIssues = true;
        allIssues.push(...dockerRunningCheck.issues);
      }
    } else {
      logger.error("❌ Docker: Not installed");
      hasIssues = true;
      allIssues.push(...dockerInstallCheck.issues);
    }

    if (!hasIssues) {
      allPrerequisitesMet = true;
      logger.success("\n✅ All prerequisites met!\n");
    } else {
      logger.error(
        "\n❌ Prerequisite check failed. Please fix the following issues:\n",
      );
      logger.list(
        allIssues.map((issue) => `• ${issue}`),
        "yellow",
      );
      logger.warning(
        "\n⏳ Press any key when you've fixed the issues and want to retry...",
      );

      await terminal.waitForUserInput();
      logger.step("\n🔍 Rechecking prerequisites...");
    }
  }
};
