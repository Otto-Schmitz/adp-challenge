# ADP Challenge — Backend API

A small **MVP REST API** built for the ADP challenge. It provides organizational management with employees, departments, and manager profiles, using a simple stack and a clean, layered structure.

---

## What this project is

- **Node.js + Express + TypeScript** — HTTP layer and business logic.
- **Prisma + SQLite** — ORM, migrations, and local persistence.
- **Zod** — Request/body validation.
- **Swagger UI** — API documentation at `/api-docs`.

Companion frontend (React/Vite):  
[adp-challenge-ui](https://github.com/Otto-Schmitz/adp-challenge-ui)

### Main entities

| Entity          | Purpose |
|-----------------|--------|
| **Employee**    | People in the company (unique `employeeNumber`, `email`; optional department and manager). |
| **Department** | Departments/areas (optional department manager). |
| **ManagerProfile** | Extra leadership data per employee (e.g. level, budget, region). |

### Features

- CRUD for employees, departments, and manager profiles.
- Employee list with **pagination** and **filters** (department, manager, status, employment type, search).
- **Team endpoint**: list direct reports of a manager.
- **Department employees**: list employees in a department.
- Validation and relationship checks (e.g. manager must exist; employee cannot be their own manager).
- Centralized error handling and consistent JSON responses.
- OpenAPI docs served by Swagger UI.

---

## First steps — how to run

**Requirements:** Node.js (v18+ recommended) and npm.

1. **Go to the backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**  
   A `.env` with `DATABASE_URL="file:./dev.db"` is enough for local SQLite. Create it if missing.

4. **Generate Prisma client and run migrations**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed the database (optional but recommended)**
   ```bash
   npm run prisma:seed
   ```

6. **Start the API**
   ```bash
   npm run dev
   ```
   Server runs at **http://localhost:3000** (or the port set in `PORT`).

7. **Try the API**
   - Health: **GET** http://localhost:3000/api/health  
   - Swagger UI: http://localhost:3000/api-docs  

---

## Improvements for a real-world project

If this were a production or long-lived product, the following would be recommended or required:

- **Authentication & authorization** — JWT, API keys, or session-based auth; role-based access (e.g. HR vs read-only).
- **Security** — HTTPS only, rate limiting, CORS tightened, input sanitization, and security headers (e.g. Helmet).
- **Environment & config** — Validate required env vars at startup; separate configs for dev/staging/production.
- **Logging & observability** — Structured logging (e.g. Pino/Winston), request IDs, and optional APM/tracing.
- **Testing** — Unit tests for services/validators, integration tests for routes, and e2e tests for critical flows.
- **Database** — Use PostgreSQL (or similar) for production; consider connection pooling and read replicas if needed.
- **API design** — Versioning (e.g. `/api/v1/`), consistent pagination metadata, and clear error codes.
- **Documentation** — Keep Swagger in sync with code; add a short runbook and deployment notes.
- **CI/CD** — Automated tests and lint on push; deploy via pipeline with safe migration strategy.
- **Soft delete & audit** — Soft delete for main entities and audit fields (e.g. `deletedAt`, `updatedBy`) for compliance.
- **Caching** — Cache for heavy or rarely changing reads (e.g. department list) where it adds value.
- **Validation & DTOs** — Stricter DTOs and validation boundaries; consider OpenAPI generation from code or the opposite.

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server (ts-node-dev). |
| `npm run build` | Compile TypeScript to `dist/`. |
| `npm start` | Run compiled app (`node dist/server.js`). |
| `npm run prisma:generate` | Generate Prisma client. |
| `npm run prisma:migrate` | Run migrations (`prisma migrate dev`). |
| `npm run prisma:seed` | Run seed script. |

---

## Project layout (high level)

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/        # e.g. Swagger
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── validators/
│   ├── middlewares/
│   ├── utils/
│   └── types/
├── docs/              # Product, API spec, architecture (for Cursor/docs)
├── package.json
└── README.md           # This file
```

For detailed API contracts and entity rules, see the markdown files in `docs/` (e.g. `api-spec.md`, `database.md`).
