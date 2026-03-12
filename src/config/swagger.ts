export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'ADP Challenge API',
    version: '1.0.0',
    description: 'REST API para gestão organizacional (Employees, Departments, Manager Profiles).',
  },
  servers: [{ url: '/', description: 'API base' }],
  paths: {
    '/api/health': {
      get: {
        summary: 'Health check',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'API is running',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'API is running' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/employees': {
      get: {
        summary: 'List employees',
        tags: ['Employees'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'departmentId', in: 'query', schema: { type: 'string', format: 'uuid' } },
          { name: 'managerId', in: 'query', schema: { type: 'string', format: 'uuid' } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['ACTIVE', 'ON_LEAVE', 'TERMINATED'] } },
          { name: 'employmentType', in: 'query', schema: { type: 'string', enum: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN'] } },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by name or email' },
        ],
        responses: {
          '200': {
            description: 'List with pagination',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiDataListEmployees' },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create employee',
        tags: ['Employees'],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/EmployeeCreate' } },
          },
        },
        responses: {
          '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataEmployee' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
        },
      },
    },
    '/api/employees/{id}': {
      get: {
        summary: 'Get employee by id',
        tags: ['Employees'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataEmployee' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        summary: 'Update employee',
        tags: ['Employees'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          content: { 'application/json': { schema: { $ref: '#/components/schemas/EmployeeUpdate' } } },
        },
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataEmployee' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        summary: 'Delete employee',
        tags: ['Employees'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { '204': { description: 'No content' }, '404': { $ref: '#/components/responses/NotFound' } },
      },
    },
    '/api/employees/{id}/team': {
      get: {
        summary: 'List direct reports (team)',
        tags: ['Employees'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': {
            description: 'List of direct reports',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataEmployees' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/api/departments': {
      get: {
        summary: 'List departments',
        tags: ['Departments'],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataDepartments' } } } },
        },
      },
      post: {
        summary: 'Create department',
        tags: ['Departments'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/DepartmentCreate' } } },
        },
        responses: {
          '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataDepartment' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
        },
      },
    },
    '/api/departments/{id}': {
      get: {
        summary: 'Get department by id',
        tags: ['Departments'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataDepartment' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        summary: 'Update department',
        tags: ['Departments'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/DepartmentUpdate' } } } },
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataDepartment' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        summary: 'Delete department',
        tags: ['Departments'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { '204': { description: 'No content' }, '404': { $ref: '#/components/responses/NotFound' } },
      },
    },
    '/api/departments/{id}/employees': {
      get: {
        summary: 'List employees in department',
        tags: ['Departments'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataEmployees' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/api/manager-profiles': {
      get: {
        summary: 'List manager profiles',
        tags: ['Manager Profiles'],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataManagerProfiles' } } } },
        },
      },
      post: {
        summary: 'Create manager profile',
        tags: ['Manager Profiles'],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ManagerProfileCreate' } } },
        },
        responses: {
          '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataManagerProfile' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
        },
      },
    },
    '/api/manager-profiles/{id}': {
      get: {
        summary: 'Get manager profile by id',
        tags: ['Manager Profiles'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataManagerProfile' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        summary: 'Update manager profile',
        tags: ['Manager Profiles'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/ManagerProfileUpdate' } } } },
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiDataManagerProfile' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        summary: 'Delete manager profile',
        tags: ['Manager Profiles'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { '204': { description: 'No content' }, '404': { $ref: '#/components/responses/NotFound' } },
      },
    },
  },
  components: {
    responses: {
      ValidationError: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Validation error' },
                details: { type: 'array', items: {} },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    schemas: {
      Employee: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          employeeNumber: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string', nullable: true },
          departmentId: { type: 'string', format: 'uuid', nullable: true },
          jobTitle: { type: 'string' },
          managerId: { type: 'string', format: 'uuid', nullable: true },
          employmentType: { type: 'string', enum: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN'] },
          status: { type: 'string', enum: ['ACTIVE', 'ON_LEAVE', 'TERMINATED'] },
          hireDate: { type: 'string', format: 'date-time' },
          terminationDate: { type: 'string', format: 'date-time', nullable: true },
          salary: { type: 'number' },
          birthdate: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      EmployeeCreate: {
        type: 'object',
        required: ['employeeNumber', 'firstName', 'lastName', 'email', 'jobTitle', 'employmentType', 'status', 'hireDate', 'salary', 'birthdate'],
        properties: {
          employeeNumber: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          departmentId: { type: 'string', format: 'uuid' },
          jobTitle: { type: 'string' },
          managerId: { type: 'string', format: 'uuid' },
          employmentType: { type: 'string', enum: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN'] },
          status: { type: 'string', enum: ['ACTIVE', 'ON_LEAVE', 'TERMINATED'] },
          hireDate: { type: 'string', format: 'date-time' },
          terminationDate: { type: 'string', format: 'date-time' },
          salary: { type: 'number', minimum: 0 },
          birthdate: { type: 'string', format: 'date-time' },
        },
      },
      EmployeeUpdate: {
        type: 'object',
        properties: {
          employeeNumber: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          departmentId: { type: 'string', format: 'uuid' },
          jobTitle: { type: 'string' },
          managerId: { type: 'string', format: 'uuid' },
          employmentType: { type: 'string', enum: ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN'] },
          status: { type: 'string', enum: ['ACTIVE', 'ON_LEAVE', 'TERMINATED'] },
          hireDate: { type: 'string', format: 'date-time' },
          terminationDate: { type: 'string', format: 'date-time' },
          salary: { type: 'number', minimum: 0 },
          birthdate: { type: 'string', format: 'date-time' },
        },
      },
      Department: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          managerId: { type: 'string', format: 'uuid', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      DepartmentCreate: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          managerId: { type: 'string', format: 'uuid' },
        },
      },
      DepartmentUpdate: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          managerId: { type: 'string', format: 'uuid' },
        },
      },
      ManagerProfile: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          employeeId: { type: 'string', format: 'uuid' },
          managementLevel: { type: 'string', enum: ['TEAM_LEAD', 'MANAGER', 'DIRECTOR', 'VP'] },
          budget: { type: 'number', minimum: 0 },
          region: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ManagerProfileCreate: {
        type: 'object',
        required: ['employeeId', 'managementLevel', 'budget'],
        properties: {
          employeeId: { type: 'string', format: 'uuid' },
          managementLevel: { type: 'string', enum: ['TEAM_LEAD', 'MANAGER', 'DIRECTOR', 'VP'] },
          budget: { type: 'number', minimum: 0 },
          region: { type: 'string' },
        },
      },
      ManagerProfileUpdate: {
        type: 'object',
        properties: {
          employeeId: { type: 'string', format: 'uuid' },
          managementLevel: { type: 'string', enum: ['TEAM_LEAD', 'MANAGER', 'DIRECTOR', 'VP'] },
          budget: { type: 'number', minimum: 0 },
          region: { type: 'string' },
        },
      },
      ApiDataEmployee: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { $ref: '#/components/schemas/Employee' },
        },
      },
      ApiDataEmployees: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { type: 'array', items: { $ref: '#/components/schemas/Employee' } },
        },
      },
      ApiDataListEmployees: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              items: { type: 'array', items: { $ref: '#/components/schemas/Employee' } },
              total: { type: 'integer' },
              page: { type: 'integer' },
              limit: { type: 'integer' },
            },
          },
        },
      },
      ApiDataDepartment: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { $ref: '#/components/schemas/Department' },
        },
      },
      ApiDataDepartments: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { type: 'array', items: { $ref: '#/components/schemas/Department' } },
        },
      },
      ApiDataManagerProfile: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { $ref: '#/components/schemas/ManagerProfile' },
        },
      },
      ApiDataManagerProfiles: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { type: 'array', items: { $ref: '#/components/schemas/ManagerProfile' } },
        },
      },
    },
  },
} as const;
