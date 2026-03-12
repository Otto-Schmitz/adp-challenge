import { PrismaClient, EmploymentType, EmployeeStatus, ManagementLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const engineering = await prisma.department.create({
    data: {
      name: 'Engineering',
      description: 'Engineering department',
    },
  });

  const hr = await prisma.department.create({
    data: {
      name: 'HR',
      description: 'Human Resources',
    },
  });

  const director = await prisma.employee.create({
    data: {
      employeeNumber: 'E1001',
      firstName: 'Alice',
      lastName: 'Director',
      email: 'alice.director@example.com',
      jobTitle: 'Director of Engineering',
      departmentId: engineering.id,
      employmentType: EmploymentType.FULL_TIME,
      status: EmployeeStatus.ACTIVE,
      hireDate: new Date('2020-01-01'),
      salary: 150000,
      birthdate: new Date('1980-05-15'),
    },
  });

  const manager = await prisma.employee.create({
    data: {
      employeeNumber: 'E1002',
      firstName: 'Bob',
      lastName: 'Manager',
      email: 'bob.manager@example.com',
      jobTitle: 'Engineering Manager',
      departmentId: engineering.id,
      managerId: director.id,
      employmentType: EmploymentType.FULL_TIME,
      status: EmployeeStatus.ACTIVE,
      hireDate: new Date('2021-03-10'),
      salary: 120000,
      birthdate: new Date('1985-08-20'),
    },
  });

  await prisma.employee.createMany({
    data: [
      {
        employeeNumber: 'E1003',
        firstName: 'Carol',
        lastName: 'Engineer',
        email: 'carol.engineer@example.com',
        jobTitle: 'Software Engineer',
        departmentId: engineering.id,
        managerId: manager.id,
        employmentType: EmploymentType.FULL_TIME,
        status: EmployeeStatus.ACTIVE,
        hireDate: new Date('2022-02-01'),
        salary: 90000,
        birthdate: new Date('1990-11-11'),
      },
      {
        employeeNumber: 'E1004',
        firstName: 'Dave',
        lastName: 'HR',
        email: 'dave.hr@example.com',
        jobTitle: 'HR Specialist',
        departmentId: hr.id,
        employmentType: EmploymentType.FULL_TIME,
        status: EmployeeStatus.ACTIVE,
        hireDate: new Date('2023-01-15'),
        salary: 70000,
        birthdate: new Date('1992-03-05'),
      },
    ],
  });

  await prisma.managerProfile.createMany({
    data: [
      {
        employeeId: director.id,
        managementLevel: ManagementLevel.DIRECTOR,
        budget: 1000000,
        region: 'Global',
      },
      {
        employeeId: manager.id,
        managementLevel: ManagementLevel.MANAGER,
        budget: 300000,
        region: 'EMEA',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

