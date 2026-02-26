import { Router } from 'express';

import { isAuth } from '../../../middlewares/is-auth.js';
import { requireRoles } from '../../../middlewares/require-roles.js';
import { employeeService } from '../../employees/employee-container.js';
import { assetService } from '../asset-container.js';
import { AssetWebController } from './asset-controller.js';

const router = Router();
const assetWebController = new AssetWebController( assetService, employeeService );

router.post( '/assets', isAuth, requireRoles( [ 'admin' ] ), assetWebController.createAsset );
router.get( '/assets', isAuth, requireRoles( [ 'admin' ] ), assetWebController.showAssets );
router.delete( '/assets/:id', isAuth, requireRoles( [ 'admin' ] ), assetWebController.deleteAsset );
router.put( '/assets/:id', isAuth, requireRoles( [ 'admin' ] ), assetWebController.updateAsset );

router.post( '/departments/:dname/:ename', isAuth, requireRoles( [ 'admin' ] ), assetWebController.createEmployeeAsset );
router.post( '/departments/:dname/:ename/:id/return', isAuth, requireRoles( [ 'admin' ] ), assetWebController.returnEmployeeAsset );
router.get( '/departments/:dname/:ename', isAuth, requireRoles( [ 'admin' ] ), assetWebController.showEmployeeAssets );
router.post( '/departments/:dname/:ename/:id/update', isAuth, requireRoles( [ 'admin' ] ), assetWebController.updateEmployeeAsset );

export { router as assetWebRouter };