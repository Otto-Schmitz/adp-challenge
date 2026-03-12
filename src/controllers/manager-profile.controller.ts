import type { Request, Response, NextFunction } from 'express';
import { ManagerProfileService } from '../services/manager-profile.service';
import {
  managerProfileCreateSchema,
  managerProfileUpdateSchema,
} from '../validators/manager-profile.validator';

export class ManagerProfileController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = managerProfileCreateSchema.parse(req.body);
      const profile = await ManagerProfileService.create(data);
      res.status(201).json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const profiles = await ManagerProfileService.list();
      res.json({ success: true, data: profiles });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await ManagerProfileService.getById(req.params.id);
      res.json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = managerProfileUpdateSchema.parse(req.body);
      const profile = await ManagerProfileService.update(req.params.id, data);
      res.json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await ManagerProfileService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

