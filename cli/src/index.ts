#!/usr/bin/env node

import { Command } from "commander";
import { CLIOptionsT, createProject } from "./create-project.js";
import { checkPrerequisites } from "./prerequisites.js";
import { setupProject } from "./setup-project.js";

const program = new Command();

program
  .name("create-t3-chill-app")
  .description(
    "Create a T3 Chill Stack project with Next.js, Supabase, tRPC, Prisma, and Stripe",
  )
  .version("1.0.0")
  .argument("[project-name]", "Name of the project directory")
  .option("-y, --yes", "Skip prompts and use defaults")
  .option("--skip-install", "Skip installing dependencies")
  .option("--skip-setup", "Skip database and container setup")
  .action(async (projectName: string | undefined, options: CLIOptionsT) => {
    try {
      // Check prerequisites
      await checkPrerequisites();

      // Create project
      const projectPath = await createProject(projectName, options);

      // Setup project (install dependencies, start containers, etc.)
      if (!options.skipSetup) {
        await setupProject(projectPath, options);
      }
    } catch (error) {
       
      console.error("\n❌ Failed to create project:", error);
      process.exit(1);
    }
  });

program.parse();
