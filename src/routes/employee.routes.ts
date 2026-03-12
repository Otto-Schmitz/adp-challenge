import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

const employeeRouter = Router();

employeeRouter.post('/', EmployeeController.create);
employeeRouter.get('/', EmployeeController.list);
employeeRouter.get('/:id', EmployeeController.getById);
employeeRouter.put('/:id', EmployeeController.update);
employeeRouter.delete('/:id', EmployeeController.remove);
employeeRouter.get('/:id/team', EmployeeController.team);

export { employeeRouter };

