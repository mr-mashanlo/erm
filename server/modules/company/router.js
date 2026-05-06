import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { companyApiController, companyWebController } from './index.js';

const router = Router();

router.post( '/api/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.createCompany );
router.delete( '/api/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.deleteCompany );
router.get( '/api/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.getCompanies );
router.get( '/api/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.getCompanyById );
router.put( '/api/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyApiController.updateCompany );

router.post( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.createCompany );
router.get( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyWebController.showCompaniesPage );

export { router as companyRouter };
