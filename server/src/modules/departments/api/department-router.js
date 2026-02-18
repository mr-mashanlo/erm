import { Router } from 'express';

import { departmentApiController } from '../department-container.js';

const router = Router();

router.post( '/', departmentApiController.createDepartment );
router.get( '/', departmentApiController.getAllDepartments );
router.get( '/:id', departmentApiController.getDepartmentById );
router.delete( '/:id', departmentApiController.deleteDepartment );
router.put( '/:id', departmentApiController.updateDepartment );

export { router as departmentApiRouter };