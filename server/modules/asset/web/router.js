import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { assetWebController } from '../index.js';
import { AssetSchema } from '../schema.js';

const assetWebRouter = Router( { mergeParams: true } );

assetWebRouter.get( '/assetss', isAuth, assetWebController.showAssetsPage );
assetWebRouter.post( '/assetss', isAuth, checkRoles( [ 'ADMIN' ] ), validate( AssetSchema ), assetWebController.createAsset );
assetWebRouter.get( '/assetss/:id', isAuth, assetWebController.showAssetPage );
assetWebRouter.post( '/assetss/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( AssetSchema ), assetWebController.updateAsset );
assetWebRouter.post( '/assetss/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), assetWebController.deleteAsset );

export { assetWebRouter };
