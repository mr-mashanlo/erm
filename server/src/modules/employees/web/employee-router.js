import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { departmentService } from '../../departments/department-container.js';
import { employeeService } from '../employee-container.js';
import { EmployeeWebController } from './employee-controller.js';

const router = Router();
const employeeWebController = new EmployeeWebController( employeeService, departmentService );

router.post( '/employees', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.createEmployee );
router.get( '/employees', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.showEmployees );
router.post( '/employees/:id/delete', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.deleteEmployee );
router.post( '/employees/:id/update', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.updateEmployee );
router.post( '/employees/:id/archive', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.archiveEmployee );
router.post( '/employees/:id/assign', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.assignEmployee );

export { router as employeeWebRouter };