import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { HomeWebController } from './home-controller.js';

const router = Router();
const homeWebController = new HomeWebController();

router.get( '/', isAuth, homeWebController.showHome );

export { router as homeWebRouter };