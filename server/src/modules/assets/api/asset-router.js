import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { assetService } from '../asset-container.js';
import { AssetApiController } from './asset-controller.js';

const router = Router();
const assetApiController = new AssetApiController( assetService );

router.post( '/assets', isAuth, requireRoles( [ 'admin' ] ), assetApiController.createAsset );
router.get( '/assets', isAuth, requireRoles( [ 'admin' ] ), assetApiController.getAssets );
router.get( '/assets/:id', isAuth, requireRoles( [ 'admin' ] ), assetApiController.getAssetById );
router.delete( '/assets/:id', isAuth, requireRoles( [ 'admin' ] ), assetApiController.deleteAsset );
router.put( '/assets/:id', isAuth, requireRoles( [ 'admin' ] ), assetApiController.updateAsset );

export { router as assetApiRouter };