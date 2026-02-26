import { withTransaction } from '../../config/transaction.js';

export class DepartmentService {

  constructor( departmentRepository ) {
    this.departmentRepository = departmentRepository;
  };

  createDepartment = async ( department ) => {
    return withTransaction( async () => {
      return await this.departmentRepository.create( department );
    } );
  };

  deleteDepartment = async ( id ) => {
    return withTransaction( async () => {
      await this.departmentRepository.delete( id );
    } );
  };

  getDepartments = async ( filter, sort, pagination ) => {
    return withTransaction( async () => {
      const departments = await this.departmentRepository.find( filter, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      const total = await this.departmentRepository.count( filter );
      return { data: departments, total, ...pagination };
    } );
  };

  getDepartmentById = async ( id ) => {
    return withTransaction( async () => {
      return await this.departmentRepository.findById( id );
    } );
  };

  getDepartmentBySlug = async ( slug ) => {
    return withTransaction( async () => {
      return await this.departmentRepository.findBySlug( slug );
    } );
  };

  updateDepartment = async ( id, department ) => {
    return withTransaction( async () => {
      return await this.departmentRepository.update( id, department );
    } );
  };

};