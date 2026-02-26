import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { departmentService } from '../department-container.js';
import { DepartmentApiController } from './department-controller.js';

const router = Router();
const departmentApiController = new DepartmentApiController( departmentService );

router.post( '/departments', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.createDepartment );
router.get( '/departments', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.getDepartments );
router.get( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.getDepartmentById );
router.delete( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.deleteDepartment );
router.put( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.updateDepartment );

export { router as departmentApiRouter };