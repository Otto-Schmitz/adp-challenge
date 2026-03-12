import { z } from 'zod';
import { EmploymentType, EmployeeStatus } from '@prisma/client';

export const employeeCreateSchema = z.object({
  employeeNumber: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  departmentId: z.string().uuid().optional(),
  jobTitle: z.string().min(1),
  managerId: z.string().uuid().optional(),
  employmentType: z.nativeEnum(EmploymentType),
  status: z.nativeEnum(EmployeeStatus),
  hireDate: z.string().or(z.date()),
  terminationDate: z.string().or(z.date()).optional(),
  salary: z.number().nonnegative(),
  birthdate: z.string().or(z.date()),
});

export const employeeUpdateSchema = employeeCreateSchema.partial();

export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdateInput = z.infer<typeof employeeUpdateSchema>;

