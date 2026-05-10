import generateSlug from 'slug';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class CompanyService {

  constructor( companyRepository ) {
    this.companyRepository = companyRepository;
  };

  createCompany = async body => {
    return await this.companyRepository.create( { ...body, slug: generateSlug( body.name ) } );
  };

  deleteCompany = async query => {
    await this.companyRepository.delete( query );
  };

  getCompanies = async ( query = {} ) => {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.companyRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.companyRepository.count( filters );
    return { data, total, ...pagination };
  };

  getCompanyById = async id => {
    return await this.companyRepository.findById( id );
  };

  updateCompany = async ( id, body ) => {
    return await this.companyRepository.update( { id }, { ...body, slug: generateSlug( body.name ) } );
  };

};