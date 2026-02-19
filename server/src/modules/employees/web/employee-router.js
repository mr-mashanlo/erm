import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { employeeWebController } from '../employee-container.js';
import { EmployeeSchema } from '../employee-schema.js';

const router = Router();

router.post( '/', validate( EmployeeSchema ), employeeWebController.create );
router.post( '/:id/delete', employeeWebController.delete );
router.post( '/:id/update', employeeWebController.update );
router.get( '/:id/assets', employeeWebController.showEmployeeAssets );
router.get( '/', employeeWebController.showEmployees );
router.get( '/:id', validate( EmployeeSchema ), employeeWebController.showEmployee );

export { router as employeeWebRouter };