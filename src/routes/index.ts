import { Router } from 'express';
import { employeeRouter } from './employee.routes';
import { departmentRouter } from './department.routes';
import { managerProfileRouter } from './manager-profile.routes';

const router = Router();

router.use('/employees', employeeRouter);
router.use('/departments', departmentRouter);
router.use('/manager-profiles', managerProfileRouter);

export { router };


