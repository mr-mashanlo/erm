import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { typeApiController, typeWebController } from './index.js';

const router = Router();

router.post( '/api/types', isAuth, checkRoles( [ 'ADMIN' ] ), typeApiController.createType );
router.delete( '/api/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeApiController.deleteType );
router.get( '/api/types', typeApiController.getTypes );
router.get( '/api/types/:id', typeApiController.getTypeById );
router.put( '/api/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeApiController.updateType );

router.post( '/types', isAuth, checkRoles( [ 'ADMIN' ] ), typeWebController.createType );
router.get( '/types', isAuth, typeWebController.showTypesPage );

export { router as typeRouter };
