import { prisma } from '../../config/db.js';
import { CompanyController } from './controller.js';
import { CompanyRepository } from './repository.js';
import { CompanyService } from './service.js';

const companyRepository = new CompanyRepository( prisma );
export const companyService = new CompanyService( companyRepository );
export const companyController = new CompanyController( companyService );