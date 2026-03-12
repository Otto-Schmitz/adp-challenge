export interface PaginationParams {
  page: number;
  limit: number;
}

export function getPagination(queryPage?: string, queryLimit?: string): PaginationParams {
  const page = Math.max(Number(queryPage) || 1, 1);
  const limit = Math.max(Math.min(Number(queryLimit) || 10, 100), 1);
  return { page, limit };
}

