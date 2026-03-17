import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { userService } from '../user-container.js';
import { SigninSchema, SignupSchema } from '../user-schema.js';
import { UserWebController } from './user-controller.js';

const router = Router();
const userWebController = new UserWebController( userService );

router.get( '/signin', userWebController.showSignin );
router.post( '/signin', validate( SigninSchema ), userWebController.signin );
router.get( '/signup', userWebController.showSignup );
router.post( '/signup', validate( SignupSchema ), userWebController.signup );

export { router as userWebRouter };