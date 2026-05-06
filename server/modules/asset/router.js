import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { assetApiController, assetWebController } from './index.js';

const router = Router();

router.post( '/api/assets', isAuth, checkRoles( [ 'ADMIN' ] ), assetApiController.createAsset );
router.delete( '/api/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetApiController.deleteAsset );
router.get( '/api/assets', assetApiController.getAssets );
router.get( '/api/assets/:id', assetApiController.getAssetById );
router.put( '/api/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetApiController.updateAsset );

router.post( '/assets', isAuth, checkRoles( [ 'ADMIN' ] ), assetWebController.createAsset );
router.get( '/assets', isAuth, assetWebController.showAssetsPage );

export { router as assetRouter };
