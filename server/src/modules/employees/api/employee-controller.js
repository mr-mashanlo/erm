import { PaginationQuerySchema, SortingQuerySchema } from '../../../schemas/filter-query-schema.js';
import { EmployeeQuerySchema, FilteringQuerySchema } from '../employee-schema.js';

export class EmployeeApiController {

  constructor( employeeService ) {
    this.employeeService = employeeService;
  };

  createEmployee = async ( req, res, next ) => {
    try {
      const body = EmployeeQuerySchema.parse( req.body );
      const employee = await this.employeeService.createEmployee( { ...body, companyId: req.user.company } );
      res.json( employee );
    } catch ( error ) {
      next( error );
    }
  };

  deleteEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.deleteEmployee( req.params.id );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  getEmployees = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const employees = await this.employeeService.getEmployees( { ...filters, companyId: req.user.company }, sort, pagination );
      res.json( employees );
    } catch ( error ) {
      next( error );
    }
  };

  getEmployeeById = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.getEmployeeById( req.params.id );
      res.json( employee );
    } catch ( error ) {
      next( error );
    }
  };

  updateEmployee = async ( req, res, next ) => {
    try {
      const body = EmployeeQuerySchema.parse( req.body );
      const employee = await this.employeeService.updateEmployee( req.params.id, body );
      res.json( employee );
    } catch ( error ) {
      next( error );
    }
  };

};