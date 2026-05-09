import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { assetApiController } from '../index.js';

const assetApiRouter = Router();

assetApiRouter.post( '/assets', isAuth, checkRoles( [ 'ADMIN' ] ), assetApiController.createAsset );
assetApiRouter.delete( '/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetApiController.deleteAsset );
assetApiRouter.get( '/assets', assetApiController.getAssets );
assetApiRouter.get( '/assets/:id', assetApiController.getAssetById );
assetApiRouter.put( '/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetApiController.updateAsset );

export { assetApiRouter };
