import { prisma } from '../../config/db.js';
import { TypeController } from './controller.js';
import { TypeRepository } from './repository.js';
import { TypeService } from './service.js';

const typeRepository = new TypeRepository( prisma );
export const typeService = new TypeService( typeRepository );
export const typeController = new TypeController( typeService );