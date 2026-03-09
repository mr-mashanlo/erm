import { Router } from 'express';

import { HomeWebController } from './home-controller.js';

const router = Router();
const homeWebController = new HomeWebController();

router.get( '/', homeWebController.showHome );

export { router as homeWebRouter };