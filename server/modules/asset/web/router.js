import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { assetWebController } from '../index.js';

const assetWebRouter = Router( { mergeParams: true } );

assetWebRouter.get( '/companies/:company/assets', isAuth, assetWebController.showAssetsPage );
assetWebRouter.post( '/companies/:company/assets', isAuth, checkRoles( [ 'ADMIN' ] ), assetWebController.createAsset );

assetWebRouter.get( '/assets/:id', isAuth, assetWebController.showAssetPage );
assetWebRouter.post( '/assets/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetWebController.updateAsset );
assetWebRouter.post( '/assets/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), assetWebController.deleteAsset );

export { assetWebRouter };
