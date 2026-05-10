import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { assetAssignWebController } from '../index.js';
import { AssetAssignSchema } from '../schema.js';

const assetAssignWebRouter = Router( { mergeParams: true } );

assetAssignWebRouter.get( '/assetAssigns', isAuth, assetAssignWebController.showAssetAssignsPage );
assetAssignWebRouter.post( '/assetAssigns', isAuth, checkRoles( [ 'ADMIN' ] ), validate( AssetAssignSchema ), assetAssignWebController.createAssetAssign );
assetAssignWebRouter.get( '/assetAssigns/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetAssignWebController.showAssetAssignPage );
assetAssignWebRouter.post( '/assetAssigns/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( AssetAssignSchema ), assetAssignWebController.updateAssetAssign );
assetAssignWebRouter.post( '/assetAssigns/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), assetAssignWebController.deleteAssetAssign );

export { assetAssignWebRouter };
