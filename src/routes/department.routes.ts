import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller';

const departmentRouter = Router();

departmentRouter.post('/', DepartmentController.create);
departmentRouter.get('/', DepartmentController.list);
departmentRouter.get('/:id', DepartmentController.getById);
departmentRouter.put('/:id', DepartmentController.update);
departmentRouter.delete('/:id', DepartmentController.remove);
departmentRouter.get('/:id/employees', DepartmentController.listEmployees);

export { departmentRouter };

