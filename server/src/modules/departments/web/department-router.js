import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { validate } from '../../../middlewares/validate.js';
import { departmentService } from '../department-container.js';
import { DepartmentSchema } from '../department-schema.js';
import { DepartmentWebController } from './department-controller.js';

const router = Router();
const departmentWebController = new DepartmentWebController( departmentService );

router.post( '/departments', isAuth, requireRoles( [ 'admin' ] ), validate( DepartmentSchema ), departmentWebController.create );
router.post( '/departments/:id/update', isAuth, requireRoles( [ 'admin' ] ), validate( DepartmentSchema ), departmentWebController.update );
router.post( '/departments/:id/delete', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.delete );
router.get( '/departments', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.showDepartments );
router.get( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), departmentWebController.showDepartment );

export { router as departmentWebRouter };