import * as db from '../../config/transaction.js';
import { CompanyRepository } from './company-repository.js';

export const companyRepository = new CompanyRepository( db );