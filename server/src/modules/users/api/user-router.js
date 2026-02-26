import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { userService } from '../user-container.js';
import { SigninSchema, SignupSchema } from '../user-schema.js';
import { UserApiController } from './user-controller.js';

const router = Router();
const userApiController = new UserApiController( userService );

router.post( '/auth/signin', validate( SigninSchema ), userApiController.signin );
router.post( '/auth/signup', validate( SignupSchema ), userApiController.signup );

export { router as userApiRouter };