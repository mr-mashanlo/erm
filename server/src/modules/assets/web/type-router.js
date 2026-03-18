import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { assetTypeService } from '../asset-container.js';
import { TypeWebController } from './type-controller.js';

const router = Router();
const typeWebController = new TypeWebController( assetTypeService );

router.post( '/types', isAuth, requireRoles( [ 'admin' ] ), typeWebController.createType );
router.get( '/types', isAuth, requireRoles( [ 'admin' ] ), typeWebController.showTypes );
router.post( '/types/:id/delete', isAuth, requireRoles( [ 'admin' ] ), typeWebController.deleteType );
router.post( '/types/:id/update', isAuth, requireRoles( [ 'admin' ] ), typeWebController.updateType );

export { router as typeWebRouter };