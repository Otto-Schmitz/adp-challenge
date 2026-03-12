# Database

## Stack

- Prisma ORM
- SQLite

## Models

### Employee

Fields:

- id: string UUID
- employeeNumber: string unique
- firstName: string
- lastName: string
- email: string unique
- phone: optional string
- departmentId: optional string
- jobTitle: string
- managerId: optional string
- employmentType: enum
- status: enum
- hireDate: DateTime
- terminationDate: optional DateTime
- salary: float
- birthdate: DateTime
- createdAt: DateTime
- updatedAt: DateTime

### Department

Fields:

- id: string UUID
- name: string
- description: optional string
- managerId: optional string
- createdAt: DateTime
- updatedAt: DateTime

### ManagerProfile

Fields:

- id: string UUID
- employeeId: unique string
- managementLevel: enum
- budget: float
- region: optional string
- createdAt: DateTime
- updatedAt: DateTime

## Enums

### EmploymentType

- FULL_TIME
- PART_TIME
- CONTRACTOR
- INTERN

### EmployeeStatus

- ACTIVE
- ON_LEAVE
- TERMINATED

### ManagementLevel

- TEAM_LEAD
- MANAGER
- DIRECTOR
- VP

## Relationships

- Employee optionally belongs to Department
- Employee may reference another Employee as manager
- Department may reference an Employee as manager
- ManagerProfile belongs to an Employee
- Employee can have at most one ManagerProfile

## Required indexes

- index on Employee.departmentId
- index on Employee.managerId
- index on Department.managerId
- unique index on Employee.employeeNumber
- unique index on Employee.email
- unique index on ManagerProfile.employeeId

## Consistency rules

- Department.managerId must reference existing employee
- Employee.managerId must reference existing employee
- prevent employee managing themselves
- terminationDate must be null if status != TERMINATED
- salary and budget must not be negative

## Seed data

Initial dataset should include:

- 2 departments
- 4 employees
- 2 manager profiles

Example:

Engineering

HR

1 director

1 manager

2 employees