# ADP Challenge MVP — Cursor Docs

This package contains the `.md` files used to guide Cursor in generating a **functional MVP API using Node.js + Express + Prisma + SQLite**.

## MVP Goal

Build a functional REST API for organizational management with the entities:

- `Employee`
- `Department`
- `ManagerProfile`

The API must support:

- create, update, list and retrieve employees
- create, update, list and retrieve departments
- create and retrieve manager profiles
- employee–department relationships
- leadership hierarchy via `managerId`
- department manager assignment
- basic filtering
- minimal validation
- initial seed data
- simple setup and execution documentation

## Suggested order when using Cursor

Read and use these files in this order:

1. `product.md`
2. `architecture.md`
3. `database.md`
4. `api-spec.md`
5. `implementation-plan.md`
6. `acceptance-criteria.md`
7. `cursor-prompts.md`

## Required stack

- Node.js
- Express
- Prisma
- SQLite

## Important rules

- Deliver a **truly runnable project**
- Avoid unnecessary complexity
- Focus on clarity, organization, and functionality
- Prefer simple, clean architecture
- Use TypeScript
- Use `prisma migrate dev`
- Include `seed`
- Include centralized error handling
- Include input validation
- Include simple pagination for lists
- Include a final project README