import { prisma } from '../prisma';
import type { DepartmentCreateInput, DepartmentUpdateInput } from '../validators/department.validator';
import { ApiError } from '../utils/errors';

export class DepartmentService {
  static async create(data: DepartmentCreateInput) {
    if (data.managerId) {
      const manager = await prisma.employee.findUnique({ where: { id: data.managerId } });
      if (!manager) {
        throw new ApiError(400, 'Manager employee not found');
      }
    }

    return prisma.department.create({ data });
  }

  static async list() {
    return prisma.department.findMany();
  }

  static async getById(id: string) {
    const department = await prisma.department.findUnique({ where: { id } });
    if (!department) {
      throw new ApiError(404, 'Department not found');
    }
    return department;
  }

  static async update(id: string, data: DepartmentUpdateInput) {
    await this.getById(id);

    if (data.managerId) {
      const manager = await prisma.employee.findUnique({ where: { id: data.managerId } });
      if (!manager) {
        throw new ApiError(400, 'Manager employee not found');
      }
    }

    return prisma.department.update({
      where: { id },
      data,
    });
  }

  static async remove(id: string) {
    await this.getById(id);
    await prisma.department.delete({ where: { id } });
  }

  static async listEmployees(id: string) {
    await this.getById(id);
    return prisma.employee.findMany({
      where: { departmentId: id },
    });
  }
}

