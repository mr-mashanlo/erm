import slug from 'slug';

export class CompanyService {

  constructor( companyRepository ) {
    this.companyRepository = companyRepository;
  };

  createCompany = async body => {
    return await this.companyRepository.create( { ...body, slug: slug( body.name ) } );
  };

  deleteCompany = async id => {
    await this.companyRepository.delete( { id } );
  };

  getCompanies = async () => {
    return await this.companyRepository.find();
  };

  getCompanyById = async id => {
    return await this.companyRepository.findById( { id } );
  };

  updateCompany = async ( id, body ) => {
    return await this.companyRepository.update( { id }, body );
  };

};