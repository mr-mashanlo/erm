import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { validate } from '../../../middlewares/validate.js';
import { departmentService } from '../department-container.js';
import { DepartmentSchema } from '../department-schema.js';
import { DepartmentApiController } from './department-controller.js';

const router = Router();
const departmentApiController = new DepartmentApiController( departmentService );

router.post( '/departments', isAuth, requireRoles( [ 'admin' ] ), validate( DepartmentSchema ), departmentApiController.createDepartment );
router.get( '/departments', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.getAllDepartments );
router.get( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.getDepartmentById );
router.delete( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), departmentApiController.deleteDepartment );
router.put( '/departments/:id', isAuth, requireRoles( [ 'admin' ] ), validate( DepartmentSchema ), departmentApiController.updateDepartment );

export { router as departmentApiRouter };