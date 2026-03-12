import { z } from 'zod';
import { ManagementLevel } from '@prisma/client';

export const managerProfileCreateSchema = z.object({
  employeeId: z.string().uuid(),
  managementLevel: z.nativeEnum(ManagementLevel),
  budget: z.number().nonnegative(),
  region: z.string().optional(),
});

export const managerProfileUpdateSchema = managerProfileCreateSchema.partial();

export type ManagerProfileCreateInput = z.infer<typeof managerProfileCreateSchema>;
export type ManagerProfileUpdateInput = z.infer<typeof managerProfileUpdateSchema>;

