import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { userApiController } from '../index.js';
import { AuthSchema } from '../schema.js';

const userApiRouter = Router();

userApiRouter.post( '/auth/signin', validate( AuthSchema ), userApiController.signIn );
userApiRouter.post( '/auth/signup', validate( AuthSchema ), userApiController.signUp );

export { userApiRouter };
