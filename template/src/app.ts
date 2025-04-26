import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import path from "path";
import cookies from "cookie-parser";
import { env } from "./config/env";
import { generateRoutes } from "./utils/generate-routes";
import { prisma } from "./config/db";

const app = express();
app.use(express.json());
app.use(cookies());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [env.CLIENT_URL, env.ADMIN_URL];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const nodeEnv = env.NODE_ENV || "development";
const uploadsPath = path.join(
  __dirname,
  nodeEnv === "production" ? "../../uploads" : "../uploads"
);
app.use(
  "/uploads",
  express.static(uploadsPath, {
    fallthrough: false,
    setHeaders: res => {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

async function main() {
  generateRoutes(app);

  app.listen(env.PORT, () => {
    console.info(`Server is running on port ${env.PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
