# Cursor Prompts

## Prompt 1 — generate initial structure

Create a complete REST API in TypeScript using Node.js, Express, Prisma and SQLite.

The project must be runnable and organized with:

routes
controllers
services
middlewares
validators
prisma

Use Zod validation.
Use centralized error handling.
Create app.ts and server.ts.
Add GET /api/health route.

Use other markdown files as source of truth.

## Prompt 2 — prisma schema

Generate prisma/schema.prisma based on the documents.

Requirements:

models: Employee, Department, ManagerProfile

enums: EmploymentType, EmployeeStatus, ManagementLevel

correct relations

self relation for employee manager

indexes and uniqueness constraints

timestamps fields

Also generate migration command and seed.ts.

## Prompt 3 — departments module

Implement Department module:

validator (Zod)
controller
service
routes

Endpoints:

POST /api/departments
GET /api/departments
GET /api/departments/:id
PUT /api/departments/:id
DELETE /api/departments/:id
GET /api/departments/:id/employees

## Prompt 4 — employees module

Implement Employee module with:

pagination
filters
relationship validation
team endpoint

## Prompt 5 — manager profiles

Implement ManagerProfile module with validation rules.

## Prompt 6 — final review

Review the whole project and ensure it runs correctly with migrations, seed and working endpoints.