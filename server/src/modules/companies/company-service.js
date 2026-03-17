import { withTransaction } from '../../config/transaction.js';
import { CompanySchema } from './company-schema.js';

export class CompanyService {

  constructor( companyRepository ) {
    this.companyRepository = companyRepository;
  };

  createCompany = async body => {
    const company = CompanySchema.parse( body );
    return withTransaction( async () => {
      return await this.companyRepository.create( company );
    } );
  };

  deleteCompany = async id => {
    return withTransaction( async () => {
      await this.companyRepository.delete( id );
    } );
  };

  getCompanyById = async id => {
    return withTransaction( async () => {
      return await this.companyRepository.findById( id );
    } );
  };

  updateCompany = async ( id, body ) => {
    const company = CompanySchema.parse( body );
    return withTransaction( async () => {
      return await this.companyRepository.update( id, company );
    } );
  };

};