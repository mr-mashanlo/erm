import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { userService } from '../user-container.js';
import { SigninSchema, SignupSchema } from '../user-schema.js';
import { UserWebController } from './user-controller.js';

const router = Router();
const userWebController = new UserWebController( userService );

router.get( '/auth/signin', userWebController.showSignin );
router.post( '/auth/signin', validate( SigninSchema ), userWebController.signin );
router.get( '/auth/signup', userWebController.showSignup );
router.post( '/auth/signup', validate( SignupSchema ), userWebController.signup );

export { router as userWebRouter };