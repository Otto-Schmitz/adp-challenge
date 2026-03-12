# Product Definition

## Context

The MVP represents a simple HR / organizational structure API inspired by a corporate scenario. The goal is to model people, departments and leadership profiles clearly and in a way that can evolve.

## Problem the MVP solves

Allow an organization to:

- register employees
- organize employees by department
- maintain a leadership hierarchy
- identify employees with management roles
- associate a manager with a department

## MVP Scope

### Main entities

#### Employee
Represents a company employee.

#### Department
Represents a company department or area.

#### ManagerProfile
Represents additional leadership data for employees in management roles.

## Business Rules

### Employee
- every employee has a unique identifier
- `employeeNumber` must be unique
- `email` must be unique
- employee may belong to a department
- employee may have a manager who is also an employee
- `managerId` is optional
- `terminationDate` only makes sense if status is `TERMINATED`
- `salary` cannot be negative

### Department
- department has a name
- department may have a responsible manager
- `managerId` is optional
- department manager must reference an existing employee

### ManagerProfile
- a manager profile always belongs to exactly one employee
- an employee may have at most one manager profile
- manager profiles exist only for leadership roles
- `budget` cannot be negative

## Technical goal

Deliver a functional REST API with:

- essential CRUD operations
- simple filters
- validations
- local persistence using SQLite
- Prisma for modeling and migrations
- Express for HTTP layer
- clean enough organization for technical evaluation

## Out of scope for this MVP

Do not implement:

- authentication
- authorization
- complex end-to-end tests
- queues
- cache
- file uploads
- mandatory Swagger documentation
- multi-tenancy
- external integrations
- soft delete
- advanced observability