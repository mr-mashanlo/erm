import * as db from '../../config/transaction.js';
import { CompanyRepository } from './company-repository.js';
import { CompanyService } from './company-service.js';

export const companyRepository = new CompanyRepository( db );
export const companyService = new CompanyService( companyRepository );