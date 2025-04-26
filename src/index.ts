#!/usr/bin/env node

import { intro, text, outro, spinner } from "@clack/prompts";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

async function run() {
  intro("🚀 Create Node + Express + Prisma App");
  const loading = spinner();

  const projectName = await text({
    message: "What is your project called?",
    placeholder: "my-app",
    validate(value) {
      if (!value) return "Project name is required!";
    },

    defaultValue: "my-app",
  });

  const templatePath = path.join(__dirname, "..", "template");
  const targetPath = path.join(process.cwd(), String(projectName));

  if (fs.existsSync(targetPath)) {
    console.log(chalk.red("❌ Folder already exists!"));
    process.exit(1);
  }
  loading.start("Creating project...");
  fs.copySync(templatePath, targetPath);
  loading.stop("Project created!");

  const install = await text({
    message: "Do you want to install dependencies?",
    placeholder: "y/n",
    validate(value) {
      if (!value) return "Please answer with y or n!";
      if (!["y", "n"].includes(value)) return "Please answer with y or n!";
    },
    defaultValue: "y",
  });
  if (install === "y") {
    loading.start("Installing dependencies...");
    try {
      execSync("npm install", { cwd: targetPath, stdio: "inherit" });
      loading.stop("Dependencies installed!");
      outro(`✅ Dependencies installed!`);
    } catch (error) {
      loading.stop("Failed to install dependencies!");
      console.error(chalk.red("❌ Failed to install dependencies!"));
      process.exit(1);
    }
  }

  // guide user to use npx prismma init and npx prisma generate
  outro(
    `👉 Run ${chalk.bold(
      "npx prisma init"
    )} to initialize Prisma and ${chalk.bold(
      "npx prisma generate"
    )} to generate the client.`
  );

  outro(`✅ Project ${chalk.bold(projectName)} created!`);
  outro(`👉 cd ${chalk.bold(projectName)}`);
}

run();
