import type { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employee.service';
import { employeeCreateSchema, employeeUpdateSchema } from '../validators/employee.validator';

export class EmployeeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = employeeCreateSchema.parse(req.body);
      const employee = await EmployeeService.create(data);
      res.status(201).json({ success: true, data: employee });
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EmployeeService.list(req.query);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await EmployeeService.getById(req.params.id);
      res.json({ success: true, data: employee });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = employeeUpdateSchema.parse(req.body);
      const employee = await EmployeeService.update(req.params.id, data);
      res.json({ success: true, data: employee });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await EmployeeService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  static async team(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await EmployeeService.getTeam(req.params.id);
      res.json({ success: true, data: team });
    } catch (err) {
      next(err);
    }
  }
}

