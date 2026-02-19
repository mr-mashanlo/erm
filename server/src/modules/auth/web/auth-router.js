import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { authWebController } from '../auth-container.js';
import { AuthSchema } from '../auth-schema.js';

const router = Router();

router.get( '/signin', authWebController.showSignin );
router.post( '/signin', validate( AuthSchema ), authWebController.signin );
router.get( '/signup', authWebController.showSignup );
router.post( '/signup', validate( AuthSchema ), authWebController.signup );

export { router as authWebRouter };