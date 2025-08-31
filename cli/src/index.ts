#!/usr/bin/env node

import { Command } from "commander";
import { execute } from "./commands/create";
import { APP_INFO } from "./constants";
import { CLIOptionsT } from "./types";
import terminal from "./utils/terminal";
import validation from "./utils/validation";

// Setup graceful exit handling for Ctrl+C
terminal.setupGracefulExit();

const program = new Command();

program
  .name(APP_INFO.name)
  .description(APP_INFO.description)
  .version(APP_INFO.version)
  .argument("[project-name]", "Name of the project directory")
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("--skip-install", "Skip installing dependencies")
  .option("--skip-setup", "Skip database and container setup")
  .action(
    async (
      projectName: string | undefined,
      rawOptions: Partial<CLIOptionsT>,
    ) => {
      const options = validation.sanitizeOptions(rawOptions);
      await execute(projectName, options);
    },
  );

program.parse();
