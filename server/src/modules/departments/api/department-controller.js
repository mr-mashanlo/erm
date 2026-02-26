import { FilteringQuerySchema, PaginationQuerySchema, SortingQuerySchema } from '../../../schemas/filter-query-schema.js';
import { DepartmentQuerySchema } from '../department-schema.js';

export class DepartmentApiController {

  constructor( departmentService ) {
    this.departmentService = departmentService;
  };

  createDepartment = async ( req, res, next ) => {
    try {
      const body = DepartmentQuerySchema.parse( req.body );
      const department = await this.departmentService.createDepartment( { ...body, companyId: req.user.company } );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

  deleteDepartment = async ( req, res, next ) => {
    try {
      await this.departmentService.deleteDepartment( req.params.id );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  getDepartments = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const departments = await this.departmentService.getDepartments( { ...filters, companyId: req.user.company }, sort, pagination );
      res.json( departments );
    } catch ( error ) {
      next( error );
    }
  };

  getDepartmentById = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.getDepartmentById( req.params.id );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

  updateDepartment = async ( req, res, next ) => {
    try {
      const body = DepartmentQuerySchema.parse( req.body );
      const department = await this.departmentService.updateDepartment( req.params.id, body );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

};