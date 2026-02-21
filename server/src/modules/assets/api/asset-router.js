import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { assetService } from '../asset-container.js';
import { AssetSchema } from '../asset-schema.js';
import { AssetApiController } from './asset-controller.js';

const router = Router();
const assetApiController = new AssetApiController( assetService );

router.post( '/assets', isAuth, validate( AssetSchema ), assetApiController.createAsset );
router.get( '/assets', isAuth, assetApiController.getAllAssets );
router.get( '/assets/:id', isAuth, assetApiController.getAssetById );
router.delete( '/assets/:id', isAuth, assetApiController.deleteAsset );
router.put( '/assets/:id', isAuth, validate( AssetSchema ), assetApiController.updateAsset );

export { router as assetApiRouter };