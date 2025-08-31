import type { CLIOptionsT } from "../types";

type ValidationResultT = {
  readonly isValid: boolean;
  readonly errors: string[];
};

type NodeVersionResultT = {
  readonly isValid: boolean;
  readonly majorVersion: number;
};

const validateProjectName = (name: string): ValidationResultT => {
  const errors: string[] = [];

  if (!name?.trim()) {
    errors.push("Project name cannot be empty");
  }

  if (name.includes(" ")) {
    errors.push("Project name cannot contain spaces");
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    errors.push(
      "Project name can only contain letters, numbers, hyphens, and underscores",
    );
  }

  if (name.length > 214) {
    errors.push("Project name must be less than 214 characters");
  }

  if (name.startsWith(".") || name.startsWith("-") || name.startsWith("_")) {
    errors.push("Project name cannot start with a dot, hyphen, or underscore");
  }

  return {
    isValid: errors.length === 0,
    errors,
  } as const;
};

const validateNodeVersion = (
  version: string,
  required: number,
): NodeVersionResultT => {
  const majorVersion = parseInt(version.slice(1).split(".")[0] ?? "0", 10);

  return {
    isValid: majorVersion >= required,
    majorVersion,
  } as const;
};

const sanitizeOptions = (options: Partial<CLIOptionsT>): CLIOptionsT => ({
  yes: Boolean(options.yes),
  skipInstall: Boolean(options.skipInstall),
  skipSetup: Boolean(options.skipSetup),
});

const validation = {
  validateProjectName,
  validateNodeVersion,
  sanitizeOptions,
} as const;

export default validation;
