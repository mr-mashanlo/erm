import { Router } from 'express';

import { assetApiController } from '../asset-container.js';

const router = Router();

router.post( '/', assetApiController.createAsset );
router.get( '/', assetApiController.getAllAssets );
router.get( '/:id', assetApiController.getAssetById );
router.delete( '/:id', assetApiController.deleteAsset );
router.put( '/:id', assetApiController.updateAsset );

export { router as assetApiRouter };