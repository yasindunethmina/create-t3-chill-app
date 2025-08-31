export type CLIOptionsT = {
  yes?: boolean;
  skipInstall?: boolean;
  skipSetup?: boolean;
};

export type PrerequisiteCheckT = {
  isValid: boolean;
  isRunning?: boolean;
  version?: string;
  issues: string[];
};

export type EnvironmentValidationResultT = {
  isValid: boolean;
  issues: string[];
};

export type EnvironmentCheckResultT = {
  requiredMissing: string[];
  optionalMissing: string[];
  hasPlaceholders: boolean;
  placeholderVars: string[];
};

export type StripeValidationResultT = {
  isValid: boolean;
  missingVars: string[];
};

export type ValidationResultT = {
  success: boolean;
  errors?: string[];
  warnings?: string[];
};

export type SetupStepT = {
  name: string;
  description: string;
  isOptional: boolean;
  execute: () => Promise<boolean>;
};

export type ProjectConfigT = {
  name: string;
  path: string;
  templatePath: string;
};

export type ContainerStatusT = {
  isRunning: boolean;
  services?: string[];
};
