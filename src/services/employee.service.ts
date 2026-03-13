import { prisma } from '../prisma';
import type { EmployeeCreateInput, EmployeeUpdateInput } from '../validators/employee.validator';
import { ApiError } from '../utils/errors';
import { getPagination } from '../utils/pagination';
import { parseEmployeeFilters } from '../utils/parse-query';

const EMPLOYMENT_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN'];
const EMPLOYEE_STATUSES = ['ACTIVE', 'ON_LEAVE', 'TERMINATED'];

export class EmployeeService {
  static async create(rawData: EmployeeCreateInput) {
    const data = this.normalizeDates(rawData);

    await this.validateRelations(data);

    if (data.managerId && data.managerId === (data as any).id) {
      throw new ApiError(400, 'Employee cannot manage themselves');
    }

    if (data.status !== 'TERMINATED' && data.terminationDate) {
      throw new ApiError(400, 'terminationDate must be null if status is not TERMINATED');
    }

    try {
      return await prisma.employee.create({ data });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ApiError(400, 'Duplicate employeeNumber or email');
      }
      throw e;
    }
  }

  static async list(query: any) {
    const { page, limit } = getPagination(query.page as string, query.limit as string);
    const filters = parseEmployeeFilters(query);

    const where: any = {};

    if (filters.departmentId) where.departmentId = filters.departmentId;
    if (filters.managerId) where.managerId = filters.managerId;
    if (filters.status && EMPLOYEE_STATUSES.includes(filters.status)) {
      where.status = filters.status;
    }
    if (filters.employmentType && EMPLOYMENT_TYPES.includes(filters.employmentType)) {
      where.employmentType = filters.employmentType;
    }
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search } },
        { lastName: { contains: filters.search } },
        { email: { contains: filters.search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.employee.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  static async getById(id: string) {
    const employee = await prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new ApiError(404, 'Employee not found');
    }
    return employee;
  }

  static async update(id: string, rawData: EmployeeUpdateInput) {
    await this.getById(id);

    const data = this.normalizeDates(rawData);

    await this.validateRelations(data, id);

    if (data.managerId && data.managerId === id) {
      throw new ApiError(400, 'Employee cannot manage themselves');
    }

    if (data.status && data.status !== 'TERMINATED' && data.terminationDate) {
      throw new ApiError(400, 'terminationDate must be null if status is not TERMINATED');
    }

    if (data.salary !== undefined && data.salary < 0) {
      throw new ApiError(400, 'Salary must not be negative');
    }

    try {
      return await prisma.employee.update({
        where: { id },
        data,
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ApiError(400, 'Duplicate employeeNumber or email');
      }
      throw e;
    }
  }

  static async remove(id: string) {
    await this.getById(id);
    await prisma.employee.delete({ where: { id } });
  }

  static async getTeam(id: string) {
    await this.getById(id);
    return prisma.employee.findMany({
      where: { managerId: id },
    });
  }

  private static normalizeDates<T extends { hireDate?: any; terminationDate?: any; birthdate?: any }>(
    data: T,
  ): any {
    const copy: any = { ...data };
    if (copy.hireDate && typeof copy.hireDate === 'string') copy.hireDate = new Date(copy.hireDate);
    if (copy.terminationDate && typeof copy.terminationDate === 'string')
      copy.terminationDate = new Date(copy.terminationDate);
    if (copy.birthdate && typeof copy.birthdate === 'string') copy.birthdate = new Date(copy.birthdate);
    return copy;
  }

  private static async validateRelations(
    data: Partial<EmployeeCreateInput>,
    idBeingUpdated?: string,
  ): Promise<void> {
    if (data.departmentId) {
      const department = await prisma.department.findUnique({ where: { id: data.departmentId } });
      if (!department) {
        throw new ApiError(400, 'Department not found');
      }
    }

    if (data.managerId) {
      const manager = await prisma.employee.findUnique({ where: { id: data.managerId } });
      if (!manager) {
        throw new ApiError(400, 'Manager employee not found');
      }
      if (idBeingUpdated && manager.id === idBeingUpdated) {
        throw new ApiError(400, 'Employee cannot manage themselves');
      }

      const managerProfile = await prisma.managerProfile.findUnique({
        where: { employeeId: data.managerId },
      });
      if (!managerProfile) {
        throw new ApiError(400, 'Manager must have a manager profile');
      }
    }
  }
}

