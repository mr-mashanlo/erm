import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { employeeService } from '../employee-container.js';
import { EmployeeApiController } from './employee-controller.js';

const router = Router();
const employeeApiController = new EmployeeApiController( employeeService );

router.post( '/employees', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.createEmployee );
router.get( '/employees', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.getEmployees );
router.get( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.getEmployeeById );
router.delete( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.deleteEmployee );
router.put( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.updateEmployee );

export { router as employeeApiRouter };