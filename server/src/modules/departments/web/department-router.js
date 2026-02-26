import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { departmentService } from '../department-container.js';
import { DepartmentWebController } from './department-controller.js';

const router = Router();
const departmentWebController = new DepartmentWebController( departmentService );

router.post( '/departments', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.createDepartment );
router.post( '/departments/:id/delete', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.deleteDepartment );
router.get( '/departments', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.showDepartments );
router.post( '/departments/:id/update', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.updateDepartment );

export { router as departmentWebRouter };