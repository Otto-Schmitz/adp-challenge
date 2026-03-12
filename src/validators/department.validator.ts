import { z } from 'zod';

export const departmentCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  managerId: z.string().uuid().optional(),
});

export const departmentUpdateSchema = departmentCreateSchema.partial();

export type DepartmentCreateInput = z.infer<typeof departmentCreateSchema>;
export type DepartmentUpdateInput = z.infer<typeof departmentUpdateSchema>;

