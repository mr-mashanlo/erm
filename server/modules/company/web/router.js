import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { companyWebController } from '../index.js';

const companyWebRouter = Router();

companyWebRouter.get( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.showCompaniesPage );
companyWebRouter.post( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.createCompany );

// companyWebRouter.use( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), resolveCompany );

companyWebRouter.get( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.showCompanyPage );
companyWebRouter.post( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.updateCompany );
companyWebRouter.post( '/companies/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.deleteCompany );

export { companyWebRouter };
