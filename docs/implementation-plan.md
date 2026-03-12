# Implementation Plan

## Step 1 — Project bootstrap

Create Node.js project with TypeScript and install:

- express
- prisma
- @prisma/client
- zod
- cors
- dotenv
- ts-node-dev
- typescript
- @types/express
- @types/node

Configure:

- tsconfig.json
- package.json scripts
- prisma init
- SQLite datasource
- .env

## Step 2 — Prisma modeling

Create:

- enums
- models
- relations
- indexes

Then:

- generate migration
- run migration
- generate client

## Step 3 — Seed

Create prisma/seed.ts with initial consistent data.

## Step 4 — Base HTTP

Create:

- app.ts
- server.ts
- /api/health route
- error middleware
- not found middleware

## Step 5 — Department module

Implement:

- validator
- service
- controller
- routes

## Step 6 — Employee module

Implement:

- validator
- service
- controller
- routes

Include:

- relationship validation
- pagination
- filters
- /employees/:id/team endpoint

## Step 7 — ManagerProfile module

Implement:

- validator
- service
- controller
- routes

Rules:

- employee must exist
- employee can have only one profile
- budget cannot be negative

## Step 8 — Polishing

Add:

- centralized error handling
- consistent responses
- clear messages
- final README

## Step 9 — Final verification

Ensure project:

- runs without errors
- creates SQLite database
- runs migrations
- runs seed
- responds to endpoints
- keeps clean structure