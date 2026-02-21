import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { authService } from '../auth-container.js';
import { SigninSchema, SignupSchema } from '../auth-schema.js';
import { AuthApiController } from './auth-controller.js';

const router = Router();
const authApiController = new AuthApiController( authService );

router.post( '/auth/signin', validate( SigninSchema ), authApiController.signin );
router.post( '/auth/signup', validate( SignupSchema ), authApiController.signup );

export { router as authApiRouter };