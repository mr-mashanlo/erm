import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { assetApiController } from '../asset-container.js';
import { AssetSchema } from '../asset-schema.js';

const router = Router();

router.post( '/', validate( AssetSchema ), assetApiController.createAsset );
router.get( '/', assetApiController.getAllAssets );
router.get( '/:id', assetApiController.getAssetById );
router.delete( '/:id', assetApiController.deleteAsset );
router.put( '/:id', validate( AssetSchema ), assetApiController.updateAsset );

export { router as assetApiRouter };