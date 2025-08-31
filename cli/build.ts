import { build } from "esbuild";
import { existsSync } from "fs";
import { copyFile, mkdir, readdir } from "fs/promises";
import { join } from "path";
import {
  CORE_FILES,
  ENVIRONMENT_FILES,
  SOURCE_DIRECTORIES,
  TEMPLATE_DIRECTORIES,
} from "./src/constants";

const colors = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
  gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
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

async function buildCLI(): Promise<void> {
  try {
    console.log("🔨 Building CLI...");

    // Build the CLI
    await build({
      entryPoints: ["src/index.ts"],
      bundle: true,
      platform: "node",
      target: "node18",
      outfile: "dist/index.js",
      format: "esm",
      external: ["chalk", "commander", "ora", "prompts", "fs-extra", "glob"],
      minify: true,
      sourcemap: true,
    });

    console.log(colors.green("✅ CLI built successfully"));

    // Create template directory structure
    console.log("📁 Creating template structure...");
    for (const dir of TEMPLATE_DIRECTORIES) {
      await mkdir(dir, { recursive: true });
    }
    console.log(colors.green("✅ Template structure created"));

    // Copy project package.json
    console.log("📦 Copying project package.json...");
    if (existsSync("../package.json")) {
      await copyFile("../package.json", "template/package.json");
      console.log(colors.green("✅ Project package.json copied"));
    } else {
      console.log(colors.yellow("⚠️  package.json not found, skipping..."));
    }

    // Copy Prisma files
    console.log("🗄️  Copying Prisma files...");
    const prismaFiles = ["schema.prisma", "seed.ts"];
    let prismaFilesCopied = 0;

    for (const file of prismaFiles) {
      if (existsSync(`../prisma/${file}`)) {
        await copyFile(`../prisma/${file}`, `template/prisma/${file}`);
        prismaFilesCopied++;
      }
    }

    // Copy migration files
    if (existsSync("../prisma/migrations")) {
      await copyDir("../prisma/migrations", "template/prisma/migrations");
    }

    console.log(
      colors.green(`✅ Prisma files copied (${prismaFilesCopied} files)`),
    );

    // Copy environment files
    console.log("📝 Copying environment files...");
    let envFilesCopied = 0;

    for (const envFile of ENVIRONMENT_FILES) {
      if (existsSync(`../${envFile}`)) {
        await copyFile(`../${envFile}`, `template/${envFile}`);
        envFilesCopied++;
      }
    }

    console.log(
      colors.green(
        `✅ Environment files copied (${envFilesCopied}/${ENVIRONMENT_FILES.length})`,
      ),
    );

    // Copy core project files
    console.log("📄 Copying core project files...");
    let filesCopied = 0;

    for (const file of CORE_FILES) {
      if (existsSync(`../${file}`)) {
        await copyFile(`../${file}`, `template/${file}`);
        filesCopied++;
      }
    }

    console.log(
      colors.green(
        `✅ Core files copied (${filesCopied}/${CORE_FILES.length})`,
      ),
    );

    // Copy source directories
    console.log("📁 Copying source directories...");
    let dirsCopied = 0;

    for (const dir of SOURCE_DIRECTORIES) {
      if (existsSync(`../${dir}`)) {
        await copyDir(`../${dir}`, `template/${dir}`);
        dirsCopied++;
      }
    }

    console.log(
      colors.green(
        `✅ Source directories copied (${dirsCopied}/${SOURCE_DIRECTORIES.length})`,
      ),
    );

    console.log(colors.green("🎉 Build completed successfully!"));
  } catch (error) {
    console.error(colors.red("❌ Build failed:"));

    if (error instanceof Error) {
      console.error(colors.red(`   ${error.message}`));

      // Add helpful context for common build errors
      if (
        error.message.includes("ENOENT") ||
        error.message.includes("not found")
      ) {
        console.log(colors.yellow("💡 This might be due to:"));
        console.log(
          colors.gray("   - Missing source files in the parent directory"),
        );
        console.log(colors.gray("   - Running build from wrong directory"));
        console.log(colors.gray("   - Incomplete project structure"));
      } else if (
        error.message.includes("EACCES") ||
        error.message.includes("permission")
      ) {
        console.log(colors.yellow("💡 Permission denied. Try:"));
        console.log(colors.gray("   - Running with appropriate permissions"));
        console.log(colors.gray("   - Checking directory permissions"));
      }
    } else {
      console.error(colors.red(`   ${String(error)}`));
    }

    console.log(
      colors.yellow("🔄 Check the issues above and try building again."),
    );
    process.exit(1);
  }
}

buildCLI();
