import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { validate } from '../../../middlewares/validate.js';
import { departmentService } from '../../departments/department-container.js';
import { employeeService } from '../employee-container.js';
import { EmployeeSchema } from '../employee-schema.js';
import { EmployeeWebController } from './employee-controller.js';

const router = Router();
const employeeWebController = new EmployeeWebController( employeeService, departmentService );

router.post( '/employees', isAuth, requireRoles( [ 'admin' ] ), validate( EmployeeSchema ), employeeWebController.create );
router.post( '/employees/:id/delete', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.delete );
router.post( '/employees/:id/update', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.update );
router.get( '/employees', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.showEmployees );
router.get( '/employees/:id', isAuth, requireRoles( [ 'admin' ] ), validate( EmployeeSchema ), employeeWebController.showEmployee );

export { router as employeeWebRouter };