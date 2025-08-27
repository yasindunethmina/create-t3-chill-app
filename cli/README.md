# Create T3 Chill App

Build a project with Next.js, Supabase, tRPC, Prisma, and Stripe using the Create T3 Chill App.

## Usage

```bash
npx create-t3-chill-app
```

## Options

- `--yes, -y`: Skip prompts and use defaults
- `--skip-install`: Skip installing dependencies
- `--skip-setup`: Skip database and container setup

## What it does

1. **Checks prerequisites**: Node.js 18+, Docker installation and status
2. **Creates project**: Copies template files and creates environment files
3. **Installs dependencies**: Runs `npm install`
4. **Starts containers**: Starts local Supabase with Docker
5. **Sets up database**: Generates Prisma client and resets schema
6. **Provides guidance**: Shows next steps and Stripe setup instructions

## Development

```bash
# Install dependencies
npm install

# Build CLI
npm run build

# Test locally
npm run dev
```

## Publishing

```bash
npm run build
npm publish
```
