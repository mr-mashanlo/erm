import { Router } from 'express';

import { validate } from '../../middlewares/validate.js';
import { userController } from './index.js';
import { AuthSchema } from './schema.js';

const router = Router();

router.post( '/auth/signin', validate( AuthSchema ), userController.signin );
router.post( '/auth/signup', validate( AuthSchema ), userController.signup );

export { router as userRouter };
