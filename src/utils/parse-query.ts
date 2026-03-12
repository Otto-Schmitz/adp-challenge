export interface EmployeeFilters {
  departmentId?: string;
  managerId?: string;
  status?: string;
  employmentType?: string;
  search?: string;
}

export function parseEmployeeFilters(query: any): EmployeeFilters {
  const filters: EmployeeFilters = {};

  if (typeof query.departmentId === 'string') filters.departmentId = query.departmentId;
  if (typeof query.managerId === 'string') filters.managerId = query.managerId;
  if (typeof query.status === 'string') filters.status = query.status;
  if (typeof query.employmentType === 'string') filters.employmentType = query.employmentType;
  if (typeof query.search === 'string') filters.search = query.search;

  return filters;
}

