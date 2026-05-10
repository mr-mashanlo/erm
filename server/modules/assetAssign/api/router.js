import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { assetAssignApiController } from '../index.js';
import { AssetAssignSchema } from '../schema.js';

const assetAssignApiRouter = Router();

assetAssignApiRouter.post( '/assetAssign', isAuth, checkRoles( [ 'ADMIN' ] ), validate( AssetAssignSchema ), assetAssignApiController.createAssetAssign );
assetAssignApiRouter.delete( '/assetAssign/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetAssignApiController.deleteAssetAssign );
assetAssignApiRouter.get( '/assetAssign', isAuth, checkRoles( [ 'ADMIN' ] ), assetAssignApiController.getAssetAssigns );
assetAssignApiRouter.get( '/assetAssign/:id', isAuth, checkRoles( [ 'ADMIN' ] ), assetAssignApiController.getAssetAssignById );
assetAssignApiRouter.put( '/assetAssign/:id', isAuth, checkRoles( [ 'ADMIN' ] ), validate( AssetAssignSchema ), assetAssignApiController.updateAssetAssign );

export { assetAssignApiRouter };
