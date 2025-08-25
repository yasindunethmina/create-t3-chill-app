import { serverEnv } from "@/lib/env";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const server = serverEnv();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      serverEnv().NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (server.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
