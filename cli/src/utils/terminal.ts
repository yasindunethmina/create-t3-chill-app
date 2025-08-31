const waitForUserInput = async (): Promise<void> => {
  return new Promise((resolve) => {
    const cleanup = () => {
      try {
        process.stdin.setRawMode(false);
        process.stdin.pause();
      } catch {
        // Silently handle cleanup errors
      }
    };

    const handleData = (data: Buffer) => {
      const byte = data[0];

      // Check for Ctrl+C (0x03)
      if (byte === 0x03) {
        cleanup();
        console.log("\n");
        process.exit(0);
      }

      cleanup();
      resolve();
    };

    try {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("data", handleData);
    } catch {
      // Fallback for environments that don't support raw mode
      setTimeout(() => resolve(), 1000);
    }
  });
};

const askYesNo = async (defaultToYes = true): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const cleanup = () => {
      try {
        process.stdin.setRawMode(false);
        process.stdin.pause();
      } catch {
        // Silently handle cleanup errors
      }
    };

    const handleData = (data: Buffer) => {
      const byte = data[0];

      // Check for Ctrl+C (0x03)
      if (byte === 0x03) {
        cleanup();
        console.log("\n");
        process.exit(0);
      }

      cleanup();
      const response = data.toString().toLowerCase();

      if (response === "y" || response === "yes") {
        resolve(true);
      } else if (response === "n" || response === "no") {
        resolve(false);
      } else {
        resolve(defaultToYes);
      }
    };

    try {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("data", handleData);
    } catch {
      // Fallback for environments that don't support raw mode
      resolve(defaultToYes);
    }
  });
};

const clearLine = (): void => {
  process.stdout.write("\r\x1b[K");
};

const moveCursorUp = (lines: number): void => {
  process.stdout.write(`\x1b[${lines}A`);
};

const setupGracefulExit = (): void => {
  const handleExit = () => {
    try {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    } catch {
      // Silently handle cleanup errors
    }
    console.log("\n👋 Goodbye!");
    process.exit(0);
  };

  // Handle Ctrl+C (SIGINT)
  process.on("SIGINT", handleExit);

  // Handle other termination signals
  process.on("SIGTERM", handleExit);

  // Handle uncaught exceptions gracefully
  process.on("uncaughtException", (error) => {
    console.error("\n❌ Unexpected error:", error.message);
    handleExit();
  });
};

const terminal = {
  waitForUserInput,
  askYesNo,
  clearLine,
  moveCursorUp,
  setupGracefulExit,
} as const;

export default terminal;
