# Acceptance Criteria

## Functionality

Project must:

- run locally with npm install and npm run dev
- create SQLite database via Prisma
- have working migrations
- have working seed
- expose REST API
- respond correctly to main endpoints

## Employee

- create employee
- list employees with pagination
- filter employees
- retrieve employee by id
- update employee
- delete employee
- list team of manager

## Department

- create department
- list departments
- retrieve department
- update department
- delete department
- list employees in department

## ManagerProfile

- create manager profile
- list manager profiles
- retrieve manager profile
- update manager profile
- delete manager profile

## Validation

- prevent duplicate email
- prevent duplicate employeeNumber
- prevent duplicate manager profile
- prevent employee managing themselves
- prevent negative salary
- prevent negative budget
- validate enums
- validate relationships

## Technical Quality

- TypeScript required
- layered organization
- centralized error handling
- input validation
- thin routes
- services with business rules
- clear README