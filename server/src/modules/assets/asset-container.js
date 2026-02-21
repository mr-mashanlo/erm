import * as db from '../../config/db.js';
import { AssetRepository } from './asset-repository.js';
import { AssetService } from './asset-service.js';

export const assetRepository = new AssetRepository( db );
export const assetService = new AssetService( assetRepository );