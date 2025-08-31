import chalk from "chalk";
import { ASCII_ART } from "../constants";

type LogColorT = "yellow" | "gray" | "cyan";

const info = (message: string): void => {
  console.log(chalk.blue(message));
};

const success = (message: string): void => {
  console.log(chalk.green(message));
};

const warning = (message: string): void => {
  console.log(chalk.yellow(message));
};

const error = (message: string): void => {
  console.log(chalk.red(message));
};

const gray = (message: string): void => {
  console.log(chalk.gray(message));
};

const cyan = (message: string): void => {
  console.log(chalk.cyan(message));
};

const magenta = (message: string): void => {
  console.log(chalk.magenta(message));
};

const step = (title: string): void => {
  console.log(chalk.blue.bold(`\n${title}\n`));
};

const list = (items: string[], color: LogColorT = "gray"): void => {
  items.forEach((item) => {
    console.log(chalk[color](`   ${item}`));
  });
};

const printWelcome = (): void => {
  console.log(chalk.cyan.bold(ASCII_ART));
  console.log(chalk.magenta.bold("Welcome to Create T3 Chill App! 🚀\n"));
  console.log(
    chalk.gray(
      "The fastest way to ship products with Next.js, Supabase, tRPC, Prisma, and Stripe.",
    ),
  );
};

const logger = {
  info,
  success,
  warning,
  error,
  gray,
  cyan,
  magenta,
  step,
  list,
  printWelcome,
} as const;

export default logger;
