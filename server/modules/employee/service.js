import generateSlug from 'slug';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class EmployeeService {

  constructor( employeeRepository ) {
    this.employeeRepository = employeeRepository;
  };

  createEmployee = async body => {
    return await this.employeeRepository.create( { ...body, slug: generateSlug( body.name ) } );
  };

  deleteEmployee = async query => {
    await this.employeeRepository.delete( query );
  };

  getEmployees = async ( query = {} ) => {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.employeeRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.employeeRepository.count( filters );
    return { data, total, ...pagination };
  };

  getEmployeeById = async id => {
    return await this.employeeRepository.findById( id );
  };

  updateEmployee = async ( id, body ) => {
    return await this.employeeRepository.update( { id }, { ...body, slug: generateSlug( body.name ) } );
  };

};