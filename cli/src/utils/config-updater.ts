import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import logger from "./logger";
import type { PortAllocation } from "./port-finder";

/**
 * Update the Supabase config.toml file with new port allocations
 */
export const updateSupabaseConfig = async (
  projectPath: string,
  allocation: PortAllocation,
): Promise<void> => {
  const configPath = join(projectPath, "supabase", "config.toml");

  try {
    const content = await readFile(configPath, "utf8");

    // Update port configurations in specific sections to avoid conflicts
    let updatedContent = content;

    // Update API port (in [api] section)
    updatedContent = updatedContent.replace(
      /(\[api\][\s\S]*?)^port = \d+$/m,
      `$1port = ${allocation.api}`,
    );

    // Update DB port (in [db] section)
    updatedContent = updatedContent.replace(
      /(\[db\][\s\S]*?)^port = \d+$/m,
      `$1port = ${allocation.db}`,
    );

    // Update shadow DB port (in [db] section)
    updatedContent = updatedContent.replace(
      /(\[db\][\s\S]*?)^shadow_port = \d+$/m,
      `$1shadow_port = ${allocation.shadowDb}`,
    );

    // Update Studio port (in [studio] section)
    updatedContent = updatedContent.replace(
      /(\[studio\][\s\S]*?)^port = \d+$/m,
      `$1port = ${allocation.studio}`,
    );

    // Update Inbucket port (in [inbucket] section)
    updatedContent = updatedContent.replace(
      /(\[inbucket\][\s\S]*?)^port = \d+$/m,
      `$1port = ${allocation.inbucket}`,
    );

    // Update Analytics port (in [analytics] section)
    updatedContent = updatedContent.replace(
      /(\[analytics\][\s\S]*?)^port = \d+$/m,
      `$1port = ${allocation.analytics}`,
    );

    // Also update the API URL in studio section to use the correct API port
    updatedContent = updatedContent.replace(
      /^api_url = "http:\/\/127\.0\.0\.1"$/m,
      `api_url = "http://127.0.0.1:${allocation.api}"`,
    );

    await writeFile(configPath, updatedContent, "utf8");
    logger.success(`✅ Updated supabase/config.toml with new ports\n`);
  } catch (error) {
    logger.error(`❌ Failed to update supabase/config.toml: ${error}`);
    throw new Error(`Failed to update Supabase configuration: ${error}`);
  }
};

/**
 * Update environment files with the correct database and API URLs
 */
export const updateEnvironmentFiles = async (
  projectPath: string,
  allocation: PortAllocation,
): Promise<void> => {
  const envPath = join(projectPath, ".env");
  const envLocalPath = join(projectPath, ".env.local");

  try {
    // Update .env file with database URLs
    await updateEnvFile(envPath, allocation, "env");

    // Update .env.local file with public URLs
    await updateEnvFile(envLocalPath, allocation, "env.local");

    logger.success(`✅ Updated environment files with new ports\n`);
  } catch (error) {
    logger.error(`❌ Failed to update environment files: ${error}`);
    throw new Error(`Failed to update environment files: ${error}`);
  }
};

/**
 * Update a specific environment file
 */
const updateEnvFile = async (
  filePath: string,
  allocation: PortAllocation,
  fileType: "env" | "env.local",
): Promise<void> => {
  try {
    let content = await readFile(filePath, "utf8");

    if (fileType === "env") {
      // Update database URLs in .env
      const dbUrl = `postgresql://postgres:postgres@127.0.0.1:${allocation.db}/postgres`;
      const directUrl = `postgresql://postgres:postgres@127.0.0.1:${allocation.db}/postgres`;

      content = content
        .replace(/^DATABASE_URL=.*$/m, `DATABASE_URL="${dbUrl}"`)
        .replace(/^DIRECT_URL=.*$/m, `DIRECT_URL="${directUrl}"`);
    } else {
      // Update public URLs in .env.local
      const supabaseUrl = `http://127.0.0.1:${allocation.api}`;

      content = content.replace(
        /^NEXT_PUBLIC_SUPABASE_URL=.*$/m,
        `NEXT_PUBLIC_SUPABASE_URL="${supabaseUrl}"`,
      );
    }

    await writeFile(filePath, content, "utf8");
  } catch (error) {
    // If file doesn't exist, that's okay - it will be created later
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
};

/**
 * Create or update environment template files with port-aware placeholders
 */
export const updateEnvironmentTemplates = async (
  projectPath: string,
  allocation: PortAllocation,
): Promise<void> => {
  const envExamplePath = join(projectPath, ".env.example");
  const envLocalExamplePath = join(projectPath, ".env.local.example");

  try {
    // Update .env.example
    const envExampleContent = `# Database Configuration (Generated with port: ${allocation.db})
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:${allocation.db}/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:${allocation.db}/postgres"
`;

    await writeFile(envExamplePath, envExampleContent, "utf8");

    // Update .env.local.example
    const envLocalExampleContent = `# Supabase Configuration (Generated with API port: ${allocation.api})
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:${allocation.api}"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY="[LOCAL_ANON_KEY]"

# Environment
NODE_ENV="development"

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY="[STRIPE_SECRET_KEY]"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY]"
NEXT_PUBLIC_STRIPE_PRICE_ID="[NEXT_PUBLIC_STRIPE_PRICE_ID]"
STRIPE_WEBHOOK_SECRET="[STRIPE_WEBHOOK_SECRET]"
`;

    await writeFile(envLocalExamplePath, envLocalExampleContent, "utf8");

    logger.success(
      `\n✅ Updated environment template files with port-specific configurations`,
    );
  } catch (error) {
    logger.error(`❌ Failed to update environment templates: ${error}`);
    throw new Error(`Failed to update environment templates: ${error}`);
  }
};

/**
 * Get current port allocation from existing config file
 */
export const getCurrentPortAllocation = async (
  projectPath: string,
): Promise<PortAllocation | null> => {
  const configPath = join(projectPath, "supabase", "config.toml");

  try {
    const content = await readFile(configPath, "utf8");

    const shadowDbMatch = content.match(/^shadow_port = (\d+)$/m);

    // More precise parsing using section context
    // Find API port (should be in [api] section)
    const apiSection = content.match(/\[api\][\s\S]*?(?=\[|$)/);
    const apiPortMatch = apiSection?.[0]?.match(/^port = (\d+)$/m);
    const apiPort =
      apiPortMatch && apiPortMatch[1] ? parseInt(apiPortMatch[1]) : 54321;

    // Find DB port (should be in [db] section)
    const dbSection = content.match(/\[db\][\s\S]*?(?=\[|$)/);
    const dbPortMatch = dbSection?.[0]?.match(/^port = (\d+)$/m);
    const dbPort =
      dbPortMatch && dbPortMatch[1] ? parseInt(dbPortMatch[1]) : 54322;

    const shadowDbPort =
      shadowDbMatch && shadowDbMatch[1] ? parseInt(shadowDbMatch[1]) : 54320;

    // Find Studio port (should be in [studio] section)
    const studioSection = content.match(/\[studio\][\s\S]*?(?=\[|$)/);
    const studioPortMatch = studioSection?.[0]?.match(/^port = (\d+)$/m);
    const studioPort =
      studioPortMatch && studioPortMatch[1]
        ? parseInt(studioPortMatch[1])
        : 54323;

    // Find Inbucket port (should be in [inbucket] section)
    const inbucketSection = content.match(/\[inbucket\][\s\S]*?(?=\[|$)/);
    const inbucketPortMatch = inbucketSection?.[0]?.match(/^port = (\d+)$/m);
    const inbucketPort =
      inbucketPortMatch && inbucketPortMatch[1]
        ? parseInt(inbucketPortMatch[1])
        : 54324;

    // Find Analytics port (should be in [analytics] section)
    const analyticsSection = content.match(/\[analytics\][\s\S]*?(?=\[|$)/);
    const analyticsPortMatch = analyticsSection?.[0]?.match(/^port = (\d+)$/m);
    const analyticsPort =
      analyticsPortMatch && analyticsPortMatch[1]
        ? parseInt(analyticsPortMatch[1])
        : 54327;

    return {
      api: apiPort,
      db: dbPort,
      shadowDb: shadowDbPort,
      studio: studioPort,
      inbucket: inbucketPort,
      analytics: analyticsPort,
    };
  } catch {
    return null;
  }
};
