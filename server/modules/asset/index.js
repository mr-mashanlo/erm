import { prisma } from '../../config/db.js';
import { AssetController } from './controller.js';
import { AssetRepository } from './repository.js';
import { AssetService } from './service.js';

const assetRepository = new AssetRepository( prisma );
export const assetService = new AssetService( assetRepository );
export const assetController = new AssetController( assetService );