import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { departmentWebController } from '../department-container.js';
import { DepartmentSchema } from '../department-schema.js';

const router = Router();

router.post( '/', validate( DepartmentSchema ), departmentWebController.create );
router.post( '/:id/update', validate( DepartmentSchema ), departmentWebController.update );
router.post( '/:id/delete', departmentWebController.delete );
router.get( '/', departmentWebController.showDepartments );
router.get( '/:id', departmentWebController.showDepartment );

export { router as departmentWebRouter };