import { Router } from 'express';

import { assetWebController } from '../asset-container.js';

const router = Router();

router.post( '/', assetWebController.create );
router.post( '/:id/update', assetWebController.update );
router.post( '/:id/delete', assetWebController.delete );
router.get( '/', assetWebController.assets );
router.get( '/:id', assetWebController.asset );

export { router as assetWebRouter };