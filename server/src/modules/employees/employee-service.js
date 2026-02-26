import { withTransaction } from '../../config/transaction.js';

export class EmployeeService {

  constructor( employeeRepository ) {
    this.employeeRepository = employeeRepository;
  };

  createEmployee = async ( employee ) => {
    return withTransaction( async () => {
      return await this.employeeRepository.create( employee );
    } );
  };

  deleteEmployee = async ( id ) => {
    return withTransaction( async () => {
      await this.employeeRepository.delete( id );
    } );
  };

  getEmployees = async ( filter, sort, pagination ) => {
    return withTransaction( async () => {
      const employees = await this.employeeRepository.find( filter, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      const total = await this.employeeRepository.count( filter );
      return { data: employees, total, ...pagination };
    } );
  };

  getEmployeeById = async ( id ) => {
    return withTransaction( async () => {
      return await this.employeeRepository.findById( id );
    } );
  };

  getEmployeeBySlug = async ( slug ) => {
    return withTransaction( async () => {
      return await this.employeeRepository.findBySlug( slug );
    } );
  };

  updateEmployee = async ( id, employee ) => {
    return withTransaction( async () => {
      return await this.employeeRepository.update( id, employee );
    } );
  };

};