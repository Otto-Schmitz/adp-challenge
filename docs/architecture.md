# Architecture

## Objective

Build a simple, organized, maintainable API without overengineering.

## Approach

Use a lightweight layered architecture:

- routes
- controllers
- services
- repositories
- middlewares
- validators
- utils
- prisma

## Suggested structure

src/
  app.ts
  server.ts
  routes/
    index.ts
    employee.routes.ts
    department.routes.ts
    manager-profile.routes.ts
  controllers/
    employee.controller.ts
    department.controller.ts
    manager-profile.controller.ts
  services/
    employee.service.ts
    department.service.ts
    manager-profile.service.ts
  middlewares/
    error-handler.middleware.ts
    not-found.middleware.ts
  validators/
    employee.validator.ts
    department.validator.ts
    manager-profile.validator.ts
  types/
    api-response.ts
  utils/
    pagination.ts
    parse-query.ts
    errors.ts
prisma/
  schema.prisma
  seed.ts

## Responsibilities

### Routes
Map endpoints and delegate to controllers.

### Controllers
Receive request, call service, return HTTP response.

### Services
Contain business rules and Prisma usage.

### Middlewares
Centralize error handling and not-found handling.

### Validators
Validate payloads using Zod.

## Suggested libraries

- express
- typescript
- ts-node-dev
- prisma
- @prisma/client
- zod
- cors
- dotenv

## Principles

- thin controllers
- services with business rules
- consistent responses
- predictable errors
- easy navigation in Cursor