import { prisma } from '../../config/db.js';
import { assetAssignService } from '../assetAssign/index.js';
import { companyService } from '../company/index.js';
import { employeeService } from '../employee/index.js';
import { typeService } from '../type/index.js';
import { AssetApiController } from './api/controller.js';
import { AssetRepository } from './repository.js';
import { AssetService } from './service.js';
import { AssetWebController } from './web/controller.js';

const assetRepository = new AssetRepository( prisma );
export const assetService = new AssetService( assetRepository );
export const assetApiController = new AssetApiController( assetService );
export const assetWebController = new AssetWebController( assetService, assetAssignService, employeeService, typeService, companyService );