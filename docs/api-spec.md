# API Specification

## Base URL

/api

## Health Check

GET /api/health

Response:

{
  "success": true,
  "message": "API is running"
}

## Employees

POST /api/employees

Create employee.

GET /api/employees

List employees with filters and pagination.

Filters:

- page
- limit
- departmentId
- managerId
- status
- employmentType
- search

GET /api/employees/:id

Retrieve employee.

PUT /api/employees/:id

Update employee.

DELETE /api/employees/:id

Delete employee.

GET /api/employees/:id/team

List direct reports.

## Departments

POST /api/departments

Create department.

GET /api/departments

List departments.

GET /api/departments/:id

Retrieve department.

PUT /api/departments/:id

Update department.

DELETE /api/departments/:id

Delete department.

GET /api/departments/:id/employees

List employees in department.

## Manager Profiles

POST /api/manager-profiles

Create manager profile.

GET /api/manager-profiles

List manager profiles.

GET /api/manager-profiles/:id

Retrieve manager profile.

PUT /api/manager-profiles/:id

Update manager profile.

DELETE /api/manager-profiles/:id

Delete manager profile.

## Response Pattern

Success:

{
  "success": true,
  "data": {}
}

Error:

{
  "success": false,
  "message": "Validation error",
  "details": []
}