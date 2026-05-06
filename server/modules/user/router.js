import { Router } from 'express';

import { validate } from '../../middlewares/validate.js';
import { userApiController, userWebController } from './index.js';
import { AuthSchema } from './schema.js';

const router = Router();

router.post( '/api/auth/signin', validate( AuthSchema ), userApiController.signIn );
router.post( '/api/auth/signup', validate( AuthSchema ), userApiController.signUp );

router.get( '/signin', userWebController.showSignInPage );
router.get( '/signup', userWebController.showSignUpPage );
router.post( '/signin', validate( AuthSchema ), userWebController.signIn );
router.post( '/signup', validate( AuthSchema ), userWebController.signUp );

export { router as userRouter };
