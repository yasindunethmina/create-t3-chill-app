import chalk from "chalk";
import { execSync } from "child_process";

export async function checkPrerequisites(): Promise<void> {
  console.log(chalk.blue.bold("🔍 Checking prerequisites...\n"));

  // Track results
  let nodeVersionOk = false;
  let dockerInstalled = false;
  let dockerRunning = false;

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);
  if (majorVersion >= 18) {
    nodeVersionOk = true;
    console.log(chalk.green("✅ Node.js version:"), chalk.white(nodeVersion));
  } else {
    console.log(chalk.red("❌ Node.js version:"), chalk.white(nodeVersion));
    console.log(chalk.yellow("   Please install Node.js 18 or higher"));
  }

  // Check Docker installation
  try {
    execSync("docker --version", { stdio: "pipe" });
    dockerInstalled = true;
    console.log(chalk.green("✅ Docker:"), chalk.white("Installed"));
  } catch {
    console.log(chalk.red("❌ Docker:"), chalk.white("Not installed"));
    console.log(
      chalk.yellow("   Please install Docker Desktop from https://docker.com"),
    );
    console.log(
      chalk.yellow("   After installation, ensure Docker Desktop is running"),
    );
  }

  // Check if Docker is running (only if installed)
  if (dockerInstalled) {
    try {
      execSync("docker info", { stdio: "pipe" });
      dockerRunning = true;
      console.log(chalk.green("✅ Docker:"), chalk.white("Running"));
    } catch {
      console.log(chalk.red("❌ Docker:"), chalk.white("Not running"));
      console.log(chalk.yellow("   Please start Docker Desktop and try again"));
    }
  }

  // Summary
  if (nodeVersionOk && dockerInstalled && dockerRunning) {
    console.log(chalk.green.bold("\n✅ All prerequisites met!\n"));
  } else {
    console.log(
      chalk.red.bold(
        "\n❌ Prerequisite check failed. Please fix the above issues.\n",
      ),
    );
    throw new Error("Prerequisite check failed");
  }
}
