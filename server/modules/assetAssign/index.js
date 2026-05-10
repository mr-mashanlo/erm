import { prisma } from '../../config/db.js';
import { AssetAssignApiController } from './api/controller.js';
import { AssetAssignRepository } from './repository.js';
import { AssetAssignService } from './service.js';
import { AssetAssignWebController } from './web/controller.js';

const assetAssignRepository = new AssetAssignRepository( prisma );
export const assetAssignService = new AssetAssignService( assetAssignRepository );
export const assetAssignApiController = new AssetAssignApiController( assetAssignService );
export const assetAssignWebController = new AssetAssignWebController( assetAssignService );