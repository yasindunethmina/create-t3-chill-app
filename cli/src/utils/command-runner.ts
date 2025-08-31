import { execSync } from "child_process";

export const runCommand = (
  command: string,
  cwd: string,
  options: {
    timeout?: number;
    stdio?: "inherit" | "pipe";
  } = {},
): boolean => {
  try {
    execSync(command, {
      cwd,
      stdio: options.stdio || "inherit",
      timeout: options.timeout || 120000, // Default 2 minutes
    });
    return true;
  } catch {
    return false;
  }
};

const commandRunner = {
  runCommand,
} as const;

export default commandRunner;
