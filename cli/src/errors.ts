export type ErrorTypeT =
  | "CLI_ERROR"
  | "PREREQUISITE_ERROR"
  | "PROJECT_CREATION_ERROR"
  | "ENVIRONMENT_ERROR"
  | "CONTAINER_ERROR"
  | "DATABASE_ERROR";

export type CLIErrorDataT = {
  readonly message: string;
  readonly code?: string;
  readonly suggestions: readonly string[];
  readonly type: ErrorTypeT;
};

export type CLIErrorT = Error & {
  readonly code?: string;
  readonly suggestions: readonly string[];
};

const createErrorWithProps = (
  message: string,
  name: string,
  code?: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  const error = new Error(message) as CLIErrorT;
  error.name = name;
  Object.defineProperty(error, "code", {
    value: code,
    enumerable: true,
    configurable: false,
    writable: false,
  });
  Object.defineProperty(error, "suggestions", {
    value: suggestions,
    enumerable: true,
    configurable: false,
    writable: false,
  });
  return error;
};

export const createCLIError = (
  message: string,
  code?: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  return createErrorWithProps(message, "CLIError", code, suggestions);
};

export const createPrerequisiteError = (
  message: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  return createErrorWithProps(
    message,
    "PrerequisiteError",
    "PREREQUISITE_ERROR",
    suggestions,
  );
};

export const createProjectCreationError = (
  message: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  return createErrorWithProps(
    message,
    "ProjectCreationError",
    "PROJECT_CREATION_ERROR",
    suggestions,
  );
};

export const createEnvironmentError = (
  message: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  return createErrorWithProps(
    message,
    "EnvironmentError",
    "ENVIRONMENT_ERROR",
    suggestions,
  );
};

export const createContainerError = (
  message: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  return createErrorWithProps(
    message,
    "ContainerError",
    "CONTAINER_ERROR",
    suggestions,
  );
};

export const createDatabaseError = (
  message: string,
  suggestions: readonly string[] = [],
): CLIErrorT => {
  return createErrorWithProps(
    message,
    "DatabaseError",
    "DATABASE_ERROR",
    suggestions,
  );
};
