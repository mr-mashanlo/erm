import { Router } from 'express';

import { employeeApiController } from '../employee-container.js';

const router = Router();

router.post( '/', employeeApiController.createEmployee );
router.get( '/', employeeApiController.getAllEmployees );
router.get( '/:id', employeeApiController.getEmployeeById );
router.delete( '/:id', employeeApiController.deleteEmployee );
router.put( '/:id', employeeApiController.updateEmployee );

export { router as employeeApiRouter };