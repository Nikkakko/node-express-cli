import { PrismaClient } from "@prisma/client";

// Initialize PrismaClient
export const prisma = new PrismaClient({
  log: ["error"],
});
