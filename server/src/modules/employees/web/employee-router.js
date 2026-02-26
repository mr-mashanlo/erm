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

router.post( '/departments/:name', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.createDepartmentEmployee );
router.post( '/departments/:name/:id/delete', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.deleteDepartmentEmployee );
router.get( '/departments/:name', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.showDepartmentEmployees );
router.post( '/departments/:name/:id/update', isAuth, requireRoles( [ 'admin' ] ), employeeWebController.updateDepartmentEmployee );

export { router as employeeWebRouter };