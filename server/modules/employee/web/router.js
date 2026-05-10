import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { employeeWebController } from '../index.js';
import { EmployeeSchema } from '../schema.js';

const employeeWebRouter = Router( { mergeParams: true } );

employeeWebRouter.get( '/employees', isAuth, employeeWebController.showEmployeesPage );
employeeWebRouter.post( '/employees', isAuth, checkRoles( [ 'ADMIN' ] ), validate( EmployeeSchema ), employeeWebController.createEmployee );
employeeWebRouter.get( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), employeeWebController.showEmployeePage );
employeeWebRouter.post( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( EmployeeSchema ), employeeWebController.updateEmployee );
employeeWebRouter.post( '/employees/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), employeeWebController.deleteEmployee );

export { employeeWebRouter };
