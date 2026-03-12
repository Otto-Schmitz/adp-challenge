import { Router } from 'express';
import { ManagerProfileController } from '../controllers/manager-profile.controller';

const managerProfileRouter = Router();

managerProfileRouter.post('/', ManagerProfileController.create);
managerProfileRouter.get('/', ManagerProfileController.list);
managerProfileRouter.get('/:id', ManagerProfileController.getById);
managerProfileRouter.put('/:id', ManagerProfileController.update);
managerProfileRouter.delete('/:id', ManagerProfileController.remove);

export { managerProfileRouter };

