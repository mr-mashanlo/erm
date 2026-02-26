import { FilteringQuerySchema, PaginationQuerySchema, SortingQuerySchema } from '../../../schemas/filter-query-schema.js';
import { DepartmentQuerySchema } from '../department-schema.js';

export class DepartmentWebController {

  constructor( departmentService ) {
    this.departmentService = departmentService;
  };

  createDepartment = async ( req, res, next ) => {
    try {
      const body = DepartmentQuerySchema.parse( req.body );
      await this.departmentService.createDepartment( { ...body, companyId: req.user.company } );
      res.redirect( '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteDepartment = async ( req, res, next ) => {
    try {
      await this.departmentService.deleteDepartment( req.params.id );
      res.redirect( '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  showDepartments = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const departments = await this.departmentService.getDepartments( { ...filters, companyId: req.user.company }, sort, pagination );
      res.render( 'departments', { departments } );
    } catch ( error ) {
      next( error );
    }
  };

  updateDepartment = async ( req, res, next ) => {
    try {
      const body = DepartmentQuerySchema.parse( req.body );
      await this.departmentService.updateDepartment( req.params.id, body );
      res.redirect( '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

};