import { Router } from 'express';

import { employeeWebController } from '../employee-container.js';

const router = Router();

router.post( '/', employeeWebController.create );
router.post( '/:id/delete', employeeWebController.delete );
router.post( '/:id/update', employeeWebController.update );
router.get( '/:id/assets', employeeWebController.assets );
router.get( '/', employeeWebController.employees );
router.get( '/:id', employeeWebController.employee );

export { router as employeeWebRouter };