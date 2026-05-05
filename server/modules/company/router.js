import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { companyController } from './index.js';

const router = Router();

router.post( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyController.createCompany );
router.delete( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyController.deleteCompany );
router.get( '/companies', isAuth, checkRoles( [ 'ADMIN' ] ), companyController.getCompanies );
router.get( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyController.getCompanyById );
router.put( '/companies/:id', isAuth, checkRoles( [ 'ADMIN' ] ), companyController.updateCompany );

export { router as companyRouter };
