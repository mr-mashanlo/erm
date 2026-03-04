import { withTransaction } from '../../config/transaction.js';
import { FilteringQuerySchema, PaginationQuerySchema, SortingQuerySchema } from '../../schemas/filter-query-schema.js';
import { DepartmentQuerySchema } from './department-schema.js';

export class DepartmentService {

  constructor( departmentRepository ) {
    this.departmentRepository = departmentRepository;
  };

  createDepartment = async ( body ) => {
    const department = DepartmentQuerySchema.parse( body );
    return withTransaction( async () => {
      return await this.departmentRepository.create( department );
    } );
  };

  deleteDepartment = async ( id ) => {
    return withTransaction( async () => {
      await this.departmentRepository.delete( id );
    } );
  };

  getDepartments = async ( query ) => {
    const filters = FilteringQuerySchema.parse( query );
    const sort = SortingQuerySchema.parse( query );
    const pagination = PaginationQuerySchema.parse( query );
    return withTransaction( async () => {
      const departments = await this.departmentRepository.find( filters, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      const total = await this.departmentRepository.count( filters );
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

  updateDepartment = async ( id, body ) => {
    const department = DepartmentQuerySchema.parse( body );
    return withTransaction( async () => {
      return await this.departmentRepository.update( id, department );
    } );
  };

};