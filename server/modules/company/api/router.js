import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { companyApiController } from '../index.js';

const companyApiRouter = Router();

companyApiRouter.post( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.createCompany );
companyApiRouter.delete( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.deleteCompany );
companyApiRouter.get( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.getCompanies );
companyApiRouter.get( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.getCompanyById );
companyApiRouter.put( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.updateCompany );

export { companyApiRouter };
