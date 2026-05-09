import { Router } from 'express';

import { checkRoles } from '../../../middlewares/check-roles.js';
import { isAuth } from '../../../middlewares/is-auth.js';
import { validate } from '../../../middlewares/validate.js';
import { typeWebController } from '../index.js';
import { TypeSchema } from '../schema.js';

const typeWebRouter = Router( { mergeParams: true } );

typeWebRouter.get( '/companies/:company/types', isAuth, typeWebController.showTypesPage );
typeWebRouter.post( '/companies/:company/types', isAuth, checkRoles( [ 'ADMIN' ] ), validate( TypeSchema ), typeWebController.createType );

typeWebRouter.get( '/types/:id', isAuth, typeWebController.showTypePage );
typeWebRouter.post( '/types/:id', isAuth, checkRoles( [ 'ADMIN' ] ), typeWebController.updateType );
typeWebRouter.post( '/types/:id/delete', isAuth, checkRoles( [ 'ADMIN' ] ), typeWebController.deleteType );

export { typeWebRouter };
