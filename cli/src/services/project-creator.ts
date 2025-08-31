import { existsSync } from "fs";
import { dirname, resolve } from "path";
import prompts from "prompts";
import { fileURLToPath } from "url";
import { createProjectCreationError } from "../errors";
import type { CLIOptionsT, ProjectConfigT } from "../types";
import fileSystem from "../utils/file-system";
import logger from "../utils/logger";
import validation from "../utils/validation";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getProjectName = async (
  projectName?: string,
  options?: CLIOptionsT,
): Promise<string> => {
  if (projectName) {
    const validationResult = validation.validateProjectName(projectName);
    if (!validationResult.isValid) {
      throw createProjectCreationError(
        validationResult.errors[0] || "Invalid project name",
      );
    }
    return projectName;
  }

  if (options?.yes) {
    return "my-t3-chill-app";
  }

  const defaultName = "my-t3-chill-app";
  const response = await prompts({
    type: "text",
    name: "projectName",
    message: "Enter a name for your project",
    initial: defaultName,
    validate: (value: string) => {
      const validationResult = validation.validateProjectName(value);

      if (!validationResult.isValid) {
        return validationResult.errors[0] || "Invalid project name";
      }

      if (existsSync(value)) {
        return "Directory already exists";
      }

      return true;
    },
  });

  if (!response.projectName) {
    throw createProjectCreationError(
      "Project creation was cancelled by the user",
    );
  }

  return response.projectName;
};

export const findTemplatePath = (): string => {
  const possiblePaths = [
    resolve(__dirname, "../template"),
    resolve(__dirname, "../../template"),
    resolve(process.cwd(), "template"),
    resolve(process.cwd(), "cli/template"),
  ];

  for (const templatePath of possiblePaths) {
    if (existsSync(templatePath)) {
      return templatePath;
    }
  }

  throw createProjectCreationError("Template files not found", [
    "Run the build script: npm run build",
    "Check if you're in the correct directory",
    "Verify template directory exists",
  ]);
};

export const createProject = async (
  projectName?: string,
  options?: CLIOptionsT,
): Promise<ProjectConfigT> => {
  logger.step("📁 Creating project...");

  // Get project name
  const name = await getProjectName(projectName, options);
  const projectPath = resolve(process.cwd(), name);

  // Validate project directory doesn't exist
  if (existsSync(projectPath)) {
    throw createProjectCreationError(`Directory "${name}" already exists`, [
      "Choose a different project name",
      "Remove the existing directory",
      `Try: rm -rf ${name} (use with caution)`,
    ]);
  }

  // Find template path
  const templatePath = findTemplatePath();

  // Create project directory
  await fileSystem.createDirectory(projectPath);

  // Copy template files
  logger.gray("  Copying template files...");

  try {
    await fileSystem.copyDirectory(templatePath, projectPath);
    logger.success("✅ Project created successfully!");
    logger.gray(`  Location: ${projectPath}\n`);

    return {
      name,
      path: projectPath,
      templatePath,
    };
  } catch {
    throw createProjectCreationError("Failed to copy template files", [
      "Check file permissions",
      "Ensure sufficient disk space",
      "Verify template directory is complete",
    ]);
  }
};
