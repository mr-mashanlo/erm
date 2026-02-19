import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { assetWebController } from '../asset-container.js';
import { AssetSchema } from '../asset-schema.js';

const router = Router();

router.post( '/', validate( AssetSchema ), assetWebController.create );
router.post( '/:id/update', validate( AssetSchema ), assetWebController.update );
router.post( '/:id/delete', assetWebController.delete );
router.get( '/', assetWebController.showAssets );
router.get( '/:id', assetWebController.showAsset );

export { router as assetWebRouter };