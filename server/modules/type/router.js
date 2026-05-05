import { Router } from 'express';

import { checkRoles } from '../../middlewares/check-roles.js';
import { isAuth } from '../../middlewares/is-auth.js';
import { typeController } from './index.js';

const router = Router();

router.post( '/types', isAuth, checkRoles( [ 'ADMIN' ] ), typeController.createType );
router.delete( '/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeController.deleteType );
router.get( '/types', typeController.getTypes );
router.get( '/types/:id', typeController.getTypeById );
router.put( '/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeController.updateType );

export { router as typeRouter };
