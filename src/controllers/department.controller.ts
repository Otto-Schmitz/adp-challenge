import type { Request, Response, NextFunction } from 'express';
import { DepartmentService } from '../services/department.service';
import { departmentCreateSchema, departmentUpdateSchema } from '../validators/department.validator';

export class DepartmentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = departmentCreateSchema.parse(req.body);
      const department = await DepartmentService.create(data);
      res.status(201).json({ success: true, data: department });
    } catch (err) {
      next(err);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await DepartmentService.list();
      res.json({ success: true, data: departments });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await DepartmentService.getById(req.params.id);
      res.json({ success: true, data: department });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = departmentUpdateSchema.parse(req.body);
      const department = await DepartmentService.update(req.params.id, data);
      res.json({ success: true, data: department });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await DepartmentService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async listEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await DepartmentService.listEmployees(req.params.id);
      res.json({ success: true, data: employees });
    } catch (err) {
      next(err);
    }
  }
}

