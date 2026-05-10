import { prisma } from '../../config/db.js';
import { CompanyApiController } from './api/controller.js';
import { CompanyRepository } from './repository.js';
import { CompanyService } from './service.js';
import { CompanyWebController } from './web/controller.js';

const companyRepository = new CompanyRepository( prisma );
export const companyService = new CompanyService( companyRepository );
export const companyApiController = new CompanyApiController( companyService );
export const companyWebController = new CompanyWebController( companyService );