import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { assetService, assetTypeService } from '../../assets/asset-container.js';
import { companyService } from '../../companies/company-container.js';
import { employeeService } from '../../employees/employee-container.js';
import { HomeWebController } from './home-controller.js';

const router = Router();
const homeWebController = new HomeWebController( companyService, employeeService, assetService, assetTypeService );

router.get( '/', isAuth, homeWebController.showHome );

export { router as homeWebRouter };