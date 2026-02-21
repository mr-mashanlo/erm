import { Router } from 'express';

import { validate } from '../../../middlewares/validate.js';
import { departmentService } from '../../departments/department-container.js';
import { authService } from '../auth-container.js';
import { SigninSchema, SignupSchema } from '../auth-schema.js';
import { AuthWebController } from './auth-controller.js';

const router = Router();
const authWebController = new AuthWebController( authService, departmentService );

router.get( '/auth/signin', authWebController.showSignin );
router.post( '/auth/signin', validate( SigninSchema ), authWebController.signin );
router.get( '/auth/signup', authWebController.showSignup );
router.post( '/auth/signup', validate( SignupSchema ), authWebController.signup );

export { router as authWebRouter };