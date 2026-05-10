import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { employeeApiController } from '../index.js';
import { EmployeeSchema } from '../schema.js';

const employeeApiRouter = Router();

employeeApiRouter.post( '/employees', isAuth, checkRoles( [ 'ADMIN' ] ), validate( EmployeeSchema ), employeeApiController.createEmployee );
employeeApiRouter.delete( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), employeeApiController.deleteEmployee );
employeeApiRouter.get( '/employees', isAuth, checkRoles( [ 'ADMIN' ] ), employeeApiController.getEmployees );
employeeApiRouter.get( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), employeeApiController.getEmployeeById );
employeeApiRouter.put( '/employees/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( EmployeeSchema ), employeeApiController.updateEmployee );

export { employeeApiRouter };
