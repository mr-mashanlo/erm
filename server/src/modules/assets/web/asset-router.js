import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { employeeService } from '../../employees/employee-container.js';
import { assetService } from '../asset-container.js';
import { AssetSchema } from '../asset-schema.js';
import { AssetWebController } from './asset-controller.js';

const router = Router();
const assetWebController = new AssetWebController( assetService, employeeService );

router.post( '/assets', isAuth, validate( AssetSchema ), assetWebController.create );
router.post( '/assets/:id/update', isAuth, validate( AssetSchema ), assetWebController.update );
router.post( '/assets/:id/delete', isAuth, assetWebController.delete );
router.get( '/assets', isAuth, assetWebController.showAssets );
router.get( '/assets/:id', isAuth, assetWebController.showAsset );

router.get( '/employees/:id/assets', isAuth, assetWebController.showEmployeeAssets );
router.get( '/my-assets', isAuth, assetWebController.showMyAssets );

export { router as assetWebRouter };