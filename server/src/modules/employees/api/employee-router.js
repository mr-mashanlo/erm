import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { validate } from '../../../middlewares/validate.js';
import { employeeService } from '../employee-container.js';
import { EmployeeSchema } from '../employee-schema.js';
import { EmployeeApiController } from './employee-controller.js';

const router = Router();
const employeeApiController = new EmployeeApiController( employeeService );

router.post( '/employees/', isAuth, requireRoles( [ 'admin' ] ), validate( EmployeeSchema ), employeeApiController.createEmployee );
router.get( '/employees/', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.getAllEmployees );
router.get( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.getEmployeeById );
router.delete( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), employeeApiController.deleteEmployee );
router.put( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), validate( EmployeeSchema ), employeeApiController.updateEmployee );

export { router as employeeApiRouter };