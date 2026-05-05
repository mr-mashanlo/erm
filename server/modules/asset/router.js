import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { assetController } from './index.js';

const router = Router();

router.post( '/assets', isAuth, checkRoles( [ 'ADMIN' ] ), assetController.createAsset );
router.delete( '/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetController.deleteAsset );
router.get( '/assets', assetController.getAssets );
router.get( '/assets/:id', assetController.getAssetById );
router.put( '/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetController.updateAsset );

export { router as assetRouter };
