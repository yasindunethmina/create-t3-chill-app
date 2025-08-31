import { readdir } from "fs/promises";
import { join } from "path";
import { createDatabaseError } from "../errors";
import fileSystem from "../utils/file-system";
import logger from "../utils/logger";
import { generatePrismaClient, resetDatabase } from "./dependency-installer";

export const checkMigrations = async (
  projectPath: string,
): Promise<boolean> => {
  try {
    const migrationsDir = join(projectPath, "prisma", "migrations");

    if (!(await fileSystem.fileExists(migrationsDir))) {
      return false;
    }

    const migrations = await readdir(migrationsDir);

    for (const migration of migrations) {
      const migrationPath = join(migrationsDir, migration);
      const migrationFiles = await readdir(migrationPath);

      if (migrationFiles.includes("migration.sql")) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
};

export const setupDatabase = async (projectPath: string): Promise<void> => {
  logger.step("🗄️  Setting up database...");

  try {
    // Generate Prisma client (optional, but safe to keep)
    await generatePrismaClient(projectPath);

    // Check if migrations exist and are valid
    const hasValidMigrations = await checkMigrations(projectPath);

    if (!hasValidMigrations) {
      throw createDatabaseError("No valid migration files found", [
        "Template wasn't built correctly",
        "Run: npm run build to rebuild the CLI template",
        "Check if prisma/migrations directory exists",
      ]);
    }

    // Run prisma:reset
    const resetSuccess = await resetDatabase(projectPath);

    if (resetSuccess) {
      logger.success("✅ Database setup completed");
    } else {
      throw createDatabaseError("Failed to reset database", [
        "Ensure database is not locked by another process",
        "Check if Supabase containers are running properly",
        "Manual commands to try:",
        "  npm run prisma:generate",
        "  npm run prisma:reset -- --force",
      ]);
    }
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "DatabaseError"
    ) {
      throw error;
    }

    throw createDatabaseError("Database setup failed", [
      "Database connection issues",
      "Supabase containers not running",
      "Environment variables incorrect",
    ]);
  }
};
