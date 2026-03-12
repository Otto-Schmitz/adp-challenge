import { prisma } from '../prisma';
import type {
  ManagerProfileCreateInput,
  ManagerProfileUpdateInput,
} from '../validators/manager-profile.validator';
import { ApiError } from '../utils/errors';

export class ManagerProfileService {
  static async create(data: ManagerProfileCreateInput) {
    const employee = await prisma.employee.findUnique({ where: { id: data.employeeId } });
    if (!employee) {
      throw new ApiError(400, 'Employee not found');
    }

    const existing = await prisma.managerProfile.findUnique({
      where: { employeeId: data.employeeId },
    });
    if (existing) {
      throw new ApiError(400, 'Employee already has a manager profile');
    }

    if (data.budget < 0) {
      throw new ApiError(400, 'Budget must not be negative');
    }

    return prisma.managerProfile.create({ data });
  }

  static async list() {
    return prisma.managerProfile.findMany();
  }

  static async getById(id: string) {
    const profile = await prisma.managerProfile.findUnique({ where: { id } });
    if (!profile) {
      throw new ApiError(404, 'Manager profile not found');
    }
    return profile;
  }

  static async update(id: string, data: ManagerProfileUpdateInput) {
    await this.getById(id);

    if (data.employeeId) {
      const employee = await prisma.employee.findUnique({ where: { id: data.employeeId } });
      if (!employee) {
        throw new ApiError(400, 'Employee not found');
      }

      const existing = await prisma.managerProfile.findUnique({
        where: { employeeId: data.employeeId },
      });
      if (existing && existing.id !== id) {
        throw new ApiError(400, 'Employee already has a manager profile');
      }
    }

    if (data.budget !== undefined && data.budget < 0) {
      throw new ApiError(400, 'Budget must not be negative');
    }

    return prisma.managerProfile.update({
      where: { id },
      data,
    });
  }

  static async remove(id: string) {
    await this.getById(id);
    await prisma.managerProfile.delete({ where: { id } });
  }
}

