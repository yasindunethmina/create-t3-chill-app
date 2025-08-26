import chalk from "chalk";
import { execSync } from "child_process";

export async function checkPrerequisites(): Promise<void> {
  console.log(chalk.blue.bold("🔍 Checking prerequisites...\n"));

  const checks = {
    nodeVersion: false,
    docker: false,
    dockerRunning: false,
  };

  // Check Node.js version
  try {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

    if (majorVersion >= 18) {
      checks.nodeVersion = true;
      console.log(chalk.green("✅ Node.js version:"), chalk.white(nodeVersion));
    } else {
      console.log(chalk.red("❌ Node.js version:"), chalk.white(nodeVersion));
      console.log(chalk.yellow("   Please install Node.js 18 or higher"));
      throw new Error("Node.js version 18+ required");
    }
  } catch {
    console.log(
      chalk.red("❌ Node.js:"),
      chalk.white("Not installed or not accessible"),
    );
    throw new Error("Node.js not found");
  }

  // Check Docker installation
  try {
    execSync("docker --version", { stdio: "pipe" });
    checks.docker = true;
    console.log(chalk.green("✅ Docker:"), chalk.white("Installed"));
  } catch {
    console.log(chalk.red("❌ Docker:"), chalk.white("Not installed"));
    console.log(
      chalk.yellow("   Please install Docker Desktop from https://docker.com"),
    );
    console.log(
      chalk.yellow("   After installation, ensure Docker Desktop is running"),
    );
    throw new Error("Docker not installed");
  }

  // Check if Docker is running
  try {
    execSync("docker info", { stdio: "pipe" });
    checks.dockerRunning = true;
    console.log(chalk.green("✅ Docker:"), chalk.white("Running"));
  } catch {
    console.log(chalk.red("❌ Docker:"), chalk.white("Not running"));
    console.log(chalk.yellow("   Please start Docker Desktop and try again"));
    throw new Error("Docker not running");
  }

  console.log(chalk.green.bold("\n✅ All prerequisites met!\n"));
}
