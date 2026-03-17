import * as db from '../../config/transaction.js';
import { AssetRepository } from './asset-repository.js';
import { AssetService } from './asset-service.js';
import { AssetTypeRepository } from './asset-type-repository.js';
import { AssetTypeService } from './asset-type-service.js';

export const assetRepository = new AssetRepository( db );
export const assetTypeRepository = new AssetTypeRepository( db );
export const assetService = new AssetService( assetRepository );
export const assetTypeService = new AssetTypeService( assetTypeRepository );