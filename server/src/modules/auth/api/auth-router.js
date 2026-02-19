import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { authApiController } from '../auth-container.js';
import { AuthSchema } from '../auth-schema.js';

const router = Router();

router.post( '/signin', validate( AuthSchema ), authApiController.signin );
router.post( '/signup', validate( AuthSchema ), authApiController.signup );

export { router as authApiRouter };