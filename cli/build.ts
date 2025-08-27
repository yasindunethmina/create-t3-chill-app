import { build } from "esbuild";
import { existsSync } from "fs";
import { copyFile, mkdir, readdir, writeFile } from "fs/promises";
import { join } from "path";

async function copyDir(src: string, dest: string) {
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

async function buildCLI() {
  try {
    console.log("🔨 Building CLI...");

    // Build the CLI
    await build({
      entryPoints: ["src/index.ts"],
      bundle: true,
      platform: "node",
      target: "node18",
      outfile: "dist/index.js",
      format: "cjs",
      external: ["chalk", "commander", "ora", "prompts", "fs-extra", "glob"],
      minify: true,
      sourcemap: true,
    });

    console.log("✅ CLI built successfully");

    // Create template directory structure at root level
    console.log("📁 Creating template structure...");
    const templateDirs = [
      "template",
      "template/app",
      "template/components",
      "template/lib",
      "template/hooks",
      "template/providers",
      "template/prisma",
    ];
    for (const dir of templateDirs) {
      await mkdir(dir, { recursive: true });
    }
    console.log("✅ Template structure created");

    // Copy package.json for the generated project
    console.log("📦 Copying project package.json...");
    if (existsSync("../package.json")) {
      await copyFile("../package.json", "template/package.json");
      console.log("✅ Project package.json copied successfully");
    } else {
      console.log("⚠️  package.json not found, skipping...");
    }

    // Copy Prisma files
    console.log("🗄️  Copying Prisma files...");
    if (existsSync("../prisma/schema.prisma")) {
      await copyFile(
        "../prisma/schema.prisma",
        "template/prisma/schema.prisma",
      );
    }
    if (existsSync("../prisma/seed.ts")) {
      await copyFile("../prisma/seed.ts", "template/prisma/seed.ts");
    }

    // Copy migration files
    if (existsSync("../prisma/migrations")) {
      await copyDir("../prisma/migrations", "template/prisma/migrations");
    }
    console.log("✅ Prisma files copied successfully");

    // Copy environment files (always include these)
    console.log("📝 Copying environment files...");
    const envFiles = [".env", ".env.local", ".env.production", ".env.example"];
    for (const envFile of envFiles) {
      if (existsSync(`../${envFile}`)) {
        await copyFile(`../${envFile}`, `template/${envFile}`);
        console.log(`✅ ${envFile} copied successfully`);
      } else {
        console.log(`⚠️  ${envFile} not found, skipping...`);
      }
    }

    // Copy other necessary files
    const filesToCopy = [
      "next.config.ts",
      "tailwind.config.ts",
      "postcss.config.mjs",
      "components.json",
      "eslint.config.mjs",
      "tsconfig.json",
      "next-env.d.ts",
      "middleware.ts",
      "prisma.config.ts",
      ".gitignore",
      ".prettierrc",
      "STRIPE_SETUP.md",
      "README.md",
      "app/favicon.ico",
      "app/globals.css",
      "app/layout.tsx",
      "app/page.tsx",
      "lib/utils.ts",
      "lib/env.ts",
      "lib/prisma.ts",
      "lib/routes.ts",
    ];

    for (const file of filesToCopy) {
      if (existsSync(`../${file}`)) {
        await copyFile(`../${file}`, `template/${file}`);
        console.log(`✅ ${file} copied successfully`);
      } else {
        console.log(`⚠️  ${file} not found, skipping...`);
      }
    }

    // Copy entire directories recursively
    console.log("📁 Copying app directories...");
    const directoriesToCopy = [
      "app/trpc",
      "app/api",
      "app/(protected)",
      "app/auth",
      "lib/supabase",
      "lib/stripe",
      "components",
      "providers",
      "hooks",
    ];

    for (const dir of directoriesToCopy) {
      if (existsSync(`../${dir}`)) {
        await copyDir(`../${dir}`, `template/${dir}`);
        console.log(`✅ ${dir} directory copied successfully`);
      } else {
        console.log(`⚠️  ${dir} directory not found, skipping...`);
      }
    }

    // Create a project-specific .gitignore for generated projects
    console.log("📝 Creating .gitignore for generated projects...");
    const projectGitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js build output
.next/
out/
build/

# Environment files
.env
.env.local
.env.production

# TypeScript build info
*.tsbuildinfo

# Supabase (local dev artifacts)
supabase/.branches/
supabase/.temp/

# IDE/editor folders
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage
coverage/
.nyc_output

# Cache
.cache/
.parcel-cache/
`;
    await writeFile("template/.gitignore", projectGitignoreContent);
    console.log("✅ .gitignore created for generated projects");

    console.log("🎉 Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

buildCLI();
