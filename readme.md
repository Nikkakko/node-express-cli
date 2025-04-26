# Create Node + Express + Prisma App

A simple CLI tool to quickly scaffold a new Node.js project using Express, Prisma, and TypeScript.

## Features

- Generates a basic project structure with Express and Prisma configured.
- Uses TypeScript.
- Includes essential configuration files (`.gitignore`, `tsconfig.json`, `.env.example`).
- Optionally installs dependencies automatically.
- Provides clear next steps for the user.

## Installation

Install the CLI globally using npm:

```bash
npm install -g node-express-template # Replace 'node-express-template' with your actual package name on npm
```

## Usage

Navigate to the directory where you want to create your new project and run the command specified in the `bin` field of your `package.json` (e.g., `create-node-template`):

```bash
create-node-template # Replace with your actual command
```

The CLI will prompt you for:

1.  **Project Name:** The name for your new project directory.
2.  **Install Dependencies:** Whether to automatically run `npm install` after creating the project (defaults to yes).

## Generated Project Structure (Template)

The generated project will have a basic structure including:

- `package.json`: With core dependencies (Express, Prisma Client) and dev dependencies (TypeScript, Prisma CLI, ts-node-dev/nodemon).
- `tsconfig.json`: TypeScript configuration.
- `.gitignore`: Standard Node.js gitignore.
- `.env.example`: Example environment variables file (including `DATABASE_URL`).
- `src/`: Directory for your TypeScript source code.
  - `app.ts`: Basic Express server setup.
  - `(Other template folders/files like config, routes, etc.)`

## After Generating

Once the CLI finishes, follow the instructions provided:

1.  **Navigate into your project:**
    ```bash
    cd your-project-name
    ```
2.  **Install dependencies (if you didn't during setup):**
    ```bash
    npm install
    ```
3.  **Initialize Prisma:**
    ```bash
    npx prisma init --datasource-provider postgresql # Or your chosen provider
    ```
4.  **Configure Database:** Edit the `.env` file and set your `DATABASE_URL`.
5.  **Create Initial Migration:** Define your models in `prisma/schema.prisma` and run:
    ```bash
    npx prisma migrate dev --name init
    ```
6.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Development (of this CLI tool)

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Build the TypeScript code: `npm run build`
4.  Link for local testing: `npm link`
5.  Run the linked command (e.g., `create-node-template`) in a separate test directory.

## License

[ISC](LICENSE) <!-- Or choose another license -->
