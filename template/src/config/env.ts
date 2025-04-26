import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  // Server configuration
  PORT: z.string().default("8080"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Database
  DATABASE_URL: z.string().url(),

  CLIENT_URL: z.string().url(),
  ADMIN_URL: z.string().url(),
});

// Validate the environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1); // Exit the process if validation fails
}

export const env = parsedEnv.data;
