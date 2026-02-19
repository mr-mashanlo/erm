import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { employeeApiController } from '../employee-container.js';
import { EmployeeSchema } from '../employee-schema.js';

const router = Router();

router.post( '/', validate( EmployeeSchema ), employeeApiController.createEmployee );
router.get( '/', employeeApiController.getAllEmployees );
router.get( '/:id', employeeApiController.getEmployeeById );
router.delete( '/:id', employeeApiController.deleteEmployee );
router.put( '/:id', validate( EmployeeSchema ), employeeApiController.updateEmployee );

export { router as employeeApiRouter };