import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { companyApiController } from '../index.js';
import { CompanySchema } from '../schema.js';

const companyApiRouter = Router();

companyApiRouter.post( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), validate( CompanySchema ), companyApiController.createCompany );
companyApiRouter.delete( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.deleteCompany );
companyApiRouter.get( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.getCompanies );
companyApiRouter.get( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.getCompanyById );
companyApiRouter.put( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( CompanySchema ), companyApiController.updateCompany );

export { companyApiRouter };
