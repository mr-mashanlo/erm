import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { employeeService } from '../../employees/employee-container.js';
import { assetService } from '../asset-container.js';
import { AssetWebController } from './asset-controller.js';

const router = Router();
const assetWebController = new AssetWebController( assetService, employeeService );

router.post( '/assets', isAuth, requireRoles( [ 'admin' ] ), assetWebController.createAsset );
router.get( '/assets', isAuth, requireRoles( [ 'admin' ] ), assetWebController.showAssets );
router.post( '/assets/:id/delete', isAuth, requireRoles( [ 'admin' ] ), assetWebController.deleteAsset );
router.post( '/assets/:id/update', isAuth, requireRoles( [ 'admin' ] ), assetWebController.updateAsset );
router.post( '/assets/:id/archive', isAuth, requireRoles( [ 'admin' ] ), assetWebController.archiveAsset );
router.post( '/assets/:id/assign', isAuth, requireRoles( [ 'admin' ] ), assetWebController.assignAsset );
router.post( '/assets/:id/move', isAuth, requireRoles( [ 'admin' ] ), assetWebController.moveAsset );
router.post( '/assets/:id/return', isAuth, requireRoles( [ 'admin' ] ), assetWebController.returnAsset );

export { router as assetWebRouter };