import { existsSync } from "fs";
import { copyFile, mkdir, readdir } from "fs/promises";
import { join } from "path";
import { createProjectCreationError } from "../errors";

const copyDirectory = async (src: string, dest: string): Promise<void> => {
  try {
    if (!existsSync(dest)) {
      await mkdir(dest, { recursive: true });
    }

    const entries = await readdir(src, { withFileTypes: true });

    await Promise.all(
      entries.map(async (entry) => {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        if (entry.isDirectory()) {
          await copyDirectory(srcPath, destPath);
        } else {
          await copyFile(srcPath, destPath);
        }
      }),
    );
  } catch {
    throw createProjectCreationError(
      `Failed to copy directory from ${src} to ${dest}`,
      [
        "Check file permissions",
        "Ensure source directory exists",
        "Verify sufficient disk space",
      ],
    );
  }
};

const fileExists = async (path: string): Promise<boolean> => {
  try {
    return existsSync(path);
  } catch {
    return false;
  }
};

const createDirectory = async (path: string): Promise<void> => {
  try {
    await mkdir(path, { recursive: true });
  } catch {
    throw createProjectCreationError(`Failed to create directory: ${path}`, [
      "Check directory permissions",
      "Ensure parent directory exists",
      "Verify disk space is available",
    ]);
  }
};

const copyFiles = async (
  files: readonly string[],
  srcDir: string,
  destDir: string,
): Promise<number> => {
  const copyTasks = files.map(async (file) => {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);

    if (await fileExists(srcPath)) {
      // Ensure destination directory exists
      const destDirPath = join(destPath, "..");
      await createDirectory(destDirPath);
      await copyFile(srcPath, destPath);
      return 1;
    }
    return 0;
  });

  const results = await Promise.all(copyTasks);
  return results.reduce((sum: number, count: number) => sum + count, 0);
};

const fileSystem = {
  copyDirectory,
  fileExists,
  createDirectory,
  copyFiles,
} as const;

export default fileSystem;
