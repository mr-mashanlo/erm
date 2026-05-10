import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { companyWebController } from '../index.js';
import { CompanySchema } from '../schema.js';

const companyWebRouter = Router();

companyWebRouter.get( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.showCompaniesPage );
companyWebRouter.post( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), validate( CompanySchema ), companyWebController.createCompany );
companyWebRouter.get( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.showCompanyPage );
companyWebRouter.post( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( CompanySchema ), companyWebController.updateCompany );
companyWebRouter.post( '/companies/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.deleteCompany );

export { companyWebRouter };
