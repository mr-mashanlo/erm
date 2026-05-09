import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { typeApiController } from '../index.js';
import { TypeSchema } from '../schema.js';

const typeApiRouter = Router();

typeApiRouter.post( '/types', isAuth, checkRoles( [ 'ADMIN' ] ), validate( TypeSchema ), typeApiController.createType );
typeApiRouter.delete( '/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeApiController.deleteType );
typeApiRouter.get( '/types', typeApiController.getTypes );
typeApiRouter.get( '/types/:id', typeApiController.getTypeById );
typeApiRouter.put( '/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeApiController.updateType );

export { typeApiRouter };
