import { prisma } from '../../config/db.js';
import { assetService } from '../asset/index.js';
import { TypeApiController } from './api/controller.js';
import { TypeRepository } from './repository.js';
import { TypeService } from './service.js';
import { TypeWebController } from './web/controller.js';

const typeRepository = new TypeRepository( prisma );
export const typeService = new TypeService( typeRepository );
export const typeApiController = new TypeApiController( typeService );
export const typeWebController = new TypeWebController( typeService, assetService );