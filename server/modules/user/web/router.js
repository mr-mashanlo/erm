import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { userWebController } from '../index.js';
import { AuthSchema } from '../schema.js';

const userWebRouter = Router();

userWebRouter.get( '/signin', userWebController.showSignInPage );
userWebRouter.get( '/signup', userWebController.showSignUpPage );
userWebRouter.post( '/signin', validate( AuthSchema ), userWebController.signIn );
userWebRouter.post( '/signup', validate( AuthSchema ), userWebController.signUp );

export { userWebRouter };
