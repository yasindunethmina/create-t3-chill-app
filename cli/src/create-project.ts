import chalk from "chalk";
import { existsSync } from "fs";
import { copyFile, mkdir, readdir } from "fs/promises";
import { join, resolve } from "path";
import prompts from "prompts";

export type CLIOptionsT = {
  yes?: boolean;
  skipInstall?: boolean;
  skipSetup?: boolean;
};

async function copyDir(src: string, dest: string): Promise<void> {
  if (!existsSync(dest)) {
    await mkdir(dest, { recursive: true });
  }

  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function getProjectName(
  defaultName?: string,
  options?: CLIOptionsT,
): Promise<string> {
  if (options?.yes && defaultName) {
    return defaultName;
  }

  const response = await prompts({
    type: "text",
    name: "projectName",
    message: "Enter a name for your project",
    initial: defaultName || "my-t3-chill-app",
    validate: (value: string) => {
      if (!value || value.trim().length === 0) {
        return "Project name cannot be empty";
      }
      if (value.includes(" ")) {
        return "Project name cannot contain spaces";
      }
      if (existsSync(value)) {
        return "Directory already exists";
      }
      return true;
    },
  });

  return response.projectName;
}

export async function createProject(
  projectName?: string,
  options?: CLIOptionsT,
): Promise<string> {
  console.log(chalk.blue.bold("📁 Creating project...\n"));

  // Get project name
  const name = await getProjectName(projectName, options);
  const projectPath = resolve(process.cwd(), name);

  // First check if running from npm package (npx or global install)
  let templatePath = join(__dirname, "..", "template");
  if (!existsSync(templatePath)) {
    // Fallback for local development
    templatePath = join(process.cwd(), "template");
  }
  if (!existsSync(templatePath)) {
    // Another fallback for local development with dist
    templatePath = join(process.cwd(), "dist", "template");
  }

  if (!existsSync(templatePath)) {
    throw new Error(
      `Template not found at ${templatePath}. Please run the build script first.`,
    );
  }

  if (existsSync(projectPath)) {
    throw new Error(
      `Directory ${name} already exists. Please choose a different name.`,
    );
  }

  await mkdir(projectPath, { recursive: true });

  // Copy template files
  console.log(chalk.gray("  Copying template files..."));
  await copyDir(templatePath, projectPath);

  console.log(chalk.green("✅ Project created successfully!"));
  console.log(chalk.gray(`  Location: ${projectPath}\n`));

  return projectPath;
}
