import { Router } from 'express';

import { departmentWebController } from '../department-container.js';

const router = Router();

router.post( '/', departmentWebController.create );
router.post( '/:id/update', departmentWebController.update );
router.post( '/:id/delete', departmentWebController.delete );
router.get( '/', departmentWebController.departments );
router.get( '/:id', departmentWebController.department );

export { router as departmentWebRouter };