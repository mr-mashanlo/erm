import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { departmentApiController } from '../department-container.js';
import { DepartmentSchema } from '../department-schema.js';

const router = Router();

router.post( '/', validate( DepartmentSchema ), departmentApiController.createDepartment );
router.get( '/', departmentApiController.getAllDepartments );
router.get( '/:id', departmentApiController.getDepartmentById );
router.delete( '/:id', departmentApiController.deleteDepartment );
router.put( '/:id', validate( DepartmentSchema ), departmentApiController.updateDepartment );

export { router as departmentApiRouter };