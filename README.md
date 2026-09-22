# FlowBoard

FlowBoard is a full-stack Kanban and task-management application built with React, Express, Sequelize, and PostgreSQL. The project demonstrates a JWT-authenticated web app with a Vercel-hosted frontend and a serverless API layer that forwards requests to an Express application backed by Neon PostgreSQL.

## Live Application

- Production URL: https://flowboard-dev.vercel.app

## Overview

FlowBoard is designed to provide a lightweight task board with authenticated access, persistent storage, and a deployment architecture that mirrors a modern full-stack app: the browser talks to a Vercel app, the same-origin `/api` routes are handled by the serverless entrypoint, and the Express API talks to PostgreSQL through Sequelize.

The application supports user login and registration, protected ticket operations, and persistent task records for authenticated users.

## Features

- React + Vite frontend with client-side routing
- Express API with TypeScript
- Sequelize ORM integration with PostgreSQL
- JWT-based authentication for protected routes
- User registration and login flows
- Ticket creation, listing, updates, and deletion
- Same-origin `/api` requests in production
- Local Vite proxy to the Express server during development
- Production hosting on Vercel with Neon PostgreSQL

## Architecture

Browser
→ Vercel frontend
→ same-origin `/api` requests
→ Vercel serverless entrypoint (`api/index.ts`)
→ Express app (`server/src/app.ts`)
→ Sequelize models and queries
→ Neon PostgreSQL

For local development, Vite proxies `/api` to the standalone local Express server started by `server/src/server.ts`, which connects to PostgreSQL using the runtime config in `server/src/config/connection.ts`.

## Tech Stack

- Frontend: React, Vite, TypeScript
- Backend: Express, TypeScript
- Database: PostgreSQL
- ORM: Sequelize
- Authentication: JWT
- Hosting: Vercel
- Database hosting: Neon PostgreSQL
- CI: GitHub Actions on Node 22
- Local tooling: npm, TypeScript, Vite, Docker Compose (local/containerized workflow)

## Getting Started

### Prerequisites

- Node.js 22.x
- npm
- PostgreSQL running locally or a configured database connection
- Optional: Docker Compose for local containerized development

### Installation

```bash
git clone <repository-url>
cd FlowBoard
npm install
```

The root project orchestrates client and server installs through the package scripts. Local app development is typically run from the repo root with the shared scripts:

```bash
npm run dev
```

The project also supports separate client/server workflows:

```bash
npm run client:dev
npm run server:dev
```

### Environment Variables

The application expects environment variables to be provided in the runtime environment. The current codebase requires these values in practice:

Required:

- `DATABASE_URL` — PostgreSQL connection string used by Sequelize and the runtime app
- `ACCESS_TOKEN_SECRET` — secret used to sign and verify JWTs

Optional or local-development-specific:

- `NODE_ENV` — used to distinguish production behavior
- `PORT` — local server port for the standalone Express server
- `DB_SSL` — optional local override for SSL handling
- `DB_SYNC` — optional, only for intentional schema sync during development

Do not commit secrets to the repository. Keep values in local environment files or deployment secrets rather than source-controlled files.

### Local Development

The current local development flow is:

1. Start the backend Express server from the server package or root script.
2. Start the Vite frontend.
3. The frontend uses `baseURL: "/api"` and the Vite proxy forwards `/api` requests to the local Express server.

Example commands:

```bash
npm run server:dev
npm run client:dev
```

Or from the repo root:

```bash
npm run dev
```

### Database Migrations

The canonical Sequelize CLI configuration is in `server/config/config.cjs`. The current migration files live under `server/migrations`.

Typical migration workflow for local or environment-specific usage:

```bash
cd server
npx sequelize-cli db:migrate
```

The project also includes seed logic under `server/src/seeds`.

Do not run destructive database commands in production or against shared environments without explicit authorization.

### Production Deployment

FlowBoard is deployed on Vercel. The app uses same-origin `/api` requests from the browser, and the Vercel rewrite rules forward the API path to the serverless handler in `api/index.ts`.

The serverless function initializes the Express app and authenticates to PostgreSQL before proxying the request. Production database access is configured with PostgreSQL TLS enabled and uses the project’s `DATABASE_URL`.

## Project Structure

```text
FlowBoard/
├── api/
│   └── index.ts
├── client/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── dist/          # generated build output
├── server/
│   ├── config/
│   │   └── config.cjs
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seeds/
│   ├── migrations/
│   ├── package.json
│   └── tsconfig.json
├── .github/
│   └── workflows/
├── vercel.json
├── package.json
├── README.md
├── docker-compose.yml
├── LICENSE
└── tsconfig.json
```

## CI

GitHub Actions currently validates the repo on Node 22 by installing dependencies and running:

- client build
- server build
- Vercel API TypeScript check via `npx tsc -p api/tsconfig.json`

This workflow verifies the buildability of the frontend, backend, and serverless entrypoint without asserting end-to-end runtime behavior beyond compile-time validation.

## Security Notes

- API access is protected by JWT checks on authenticated routes.
- Secrets are expected to be supplied through environment variables rather than committed to source control.
- Production PostgreSQL connections use TLS verification.
- The codebase does not include a fallback secret to silently bypass authentication configuration.

## Development Status

FlowBoard is an actively maintained portfolio project that evolved from an earlier Kanban-style codebase into its current Vercel + Neon architecture. The repository reflects the current deployment and runtime structure rather than the original bootcamp-era documentation.

## License

This project is distributed under the MIT license.
 