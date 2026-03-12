import { z } from 'zod';

const managementLevels = ['TEAM_LEAD', 'MANAGER', 'DIRECTOR', 'VP'] as const;

export const managerProfileCreateSchema = z.object({
  employeeId: z.string().uuid(),
  managementLevel: z.enum(managementLevels),
  budget: z.number().nonnegative(),
  region: z.string().optional(),
});

export const managerProfileUpdateSchema = managerProfileCreateSchema.partial();

export type ManagerProfileCreateInput = z.infer<typeof managerProfileCreateSchema>;
export type ManagerProfileUpdateInput = z.infer<typeof managerProfileUpdateSchema>;

