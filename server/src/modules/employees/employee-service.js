import { withTransaction } from '../../config/transaction.js';
import { PaginationQuerySchema } from '../../schemas/pagination-query-schema.js';
import { EmployeeFilteringSchema, EmployeeSchema, EmployeeSortingSchema } from './employee-schema.js';

export class EmployeeService {

  constructor( employeeRepository ) {
    this.employeeRepository = employeeRepository;
  };

  assignEmployee = async employeeId => {
    return withTransaction( async () => {
      return await this.employeeRepository.assign( employeeId );
    } );
  };

  archiveEmployee = async ( id, archive ) => {
    return withTransaction( async () => {
      return await this.employeeRepository.archive( id, archive );
    } );
  };

  createEmployee = async body => {
    const employee = EmployeeSchema.parse( body );
    return withTransaction( async () => {
      return await this.employeeRepository.create( employee );
    } );
  };

  deleteEmployee = async id => {
    return withTransaction( async () => {
      await this.employeeRepository.delete( id );
    } );
  };

  getEmployees = async query => {
    const filters = EmployeeFilteringSchema.parse( query );
    const sort = EmployeeSortingSchema.parse( query );
    const pagination = PaginationQuerySchema.parse( query );
    return withTransaction( async () => {
      const employees = await this.employeeRepository.find( filters, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      return { data: employees, total: employees ? employees.length : 0, ...pagination };
    } );
  };

  getEmployeeById = async id => {
    return withTransaction( async () => {
      return await this.employeeRepository.findById( id );
    } );
  };

  getEmployeeBySlug = async slug => {
    return withTransaction( async () => {
      return await this.employeeRepository.findBySlug( slug );
    } );
  };

  updateEmployee = async ( id, body ) => {
    const employee = EmployeeSchema.pick( { name: true } ).parse( body );
    return withTransaction( async () => {
      return await this.employeeRepository.update( id, employee );
    } );
  };

};