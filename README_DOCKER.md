# FlowBoard Local Docker Development

Docker in this repository is intended for local development and testing. It is separate from the production architecture, which runs on Vercel and uses Neon PostgreSQL.

## Prerequisites

- Docker Desktop or Docker Engine with Compose support
- A working local checkout of the repository
- Node.js 22.x if you also want to run the project outside Docker

## Architecture

The current Docker Compose file defines three services:

- `db`: PostgreSQL 17
- `server`: Express API container
- `client`: frontend container served by nginx

The local port mapping is:

- PostgreSQL host port: `5434` → container port `5432`
- API host port: `3001` → container port `3001`
- Client host port: `5173` → container port `3000`

This stack is for local development only. Production traffic is routed through Vercel and the serverless API entrypoint in `api/index.ts`.

## Environment Setup

Docker Compose uses the environment file at `server/.env.docker` for the database and API configuration.

The repository currently supports these Docker-related variables in the local setup:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DATABASE_URL`
- `ACCESS_TOKEN_SECRET`
- `JWT_SECRET_KEY` (present in the local Docker env file, but the current runtime code uses `ACCESS_TOKEN_SECRET` for JWT validation)

Keep environment files out of source control and do not commit real credentials or connection strings.

## Starting the Stack

The root package.json exposes Docker-oriented commands:

```bash
npm run docker:build
npm run docker:up
npm run docker:logs
npm run docker:down
```

You can also run the Compose commands directly:

```bash
docker compose --env-file server/.env.docker up --build
docker compose --env-file server/.env.docker up -d
docker compose --env-file server/.env.docker logs -f
```

## Stopping the Stack

```bash
docker compose --env-file server/.env.docker down
```

If you need a full local reset of the named volume used by PostgreSQL:

```bash
docker compose --env-file server/.env.docker down -v
```

Use that only when you intentionally want to discard the local PostgreSQL data volume.

## Rebuilding

After dependency or Dockerfile changes, rebuild the stack:

```bash
npm run docker:build
# or

docker compose --env-file server/.env.docker up --build
```

## Database

The local database is a PostgreSQL container defined in `docker-compose.yml`.

- Host port: `5434`
- Container port: `5432`
- Service name: `db`
- Local database configuration is driven by `server/.env.docker`

This is distinct from the production database, which uses Neon PostgreSQL and the runtime config in `server/src/config/connection.ts` with TLS enabled.

The Docker database is intended for local validation and development convenience; it is not the production database architecture.

## Development Workflow

Use Docker when you want a reproducible local stack with PostgreSQL, API, and frontend running together.

Use the native npm workflow when you want to run the app directly on the host machine:

```bash
npm run dev
```

The repository’s root scripts also support:

```bash
npm run client:dev
npm run server:dev
```

## Troubleshooting

- If Docker services fail to start, confirm Docker Desktop or Docker Engine is running.
- If a port is already in use, check whether `3001`, `3000`, or `5434` is occupied locally.
- If the API or database does not start correctly, verify that `server/.env.docker` exists and is readable.
- If the Docker stack has stale build artifacts, rebuild with `docker compose --env-file server/.env.docker up --build`.
- If the database container is not ready yet, wait for the health check to pass before making application requests.

## Production

Production uses Vercel and Neon PostgreSQL. This Docker guide is only for local development and testing; it does not describe the production deployment model.


