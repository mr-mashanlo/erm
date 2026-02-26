import { PaginationQuerySchema, SortingQuerySchema } from '../../../schemas/filter-query-schema.js';
import { EmployeeQuerySchema, FilteringQuerySchema } from '../employee-schema.js';

export class EmployeeWebController {

  constructor( employeeService, departmentService ) {
    this.employeeService = employeeService;
    this.departmentService = departmentService;
  };

  createEmployee = async ( req, res, next ) => {
    try {
      const body = EmployeeQuerySchema.parse( req.body );
      await this.employeeService.createEmployee( { ...body, companyId: req.user.company } );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.deleteEmployee( req.params.id );
      res.redirect( `/departments/${req.params.id}/employees` );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployees = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const employees = await this.employeeService.getEmployees( { ...filters, companyId: req.user.company }, sort, pagination );
      res.render( 'employees', { employees } );
    } catch ( error ) {
      next( error );
    }
  };

  updateEmployee = async ( req, res, next ) => {
    try {
      const body = EmployeeQuerySchema.parse( req.body );
      await this.employeeService.updateEmployee( req.params.id, body );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  createDepartmentEmployee = async ( req, res, next ) => {
    try {
      const body = EmployeeQuerySchema.parse( req.body );
      const department = await this.departmentService.getDepartmentBySlug( req.params.name );
      await this.employeeService.createEmployee( { ...body, companyId: req.user.company, departmentId: department.id } );
      res.redirect( `/departments/${req.params.name}/` );
    } catch ( error ) {
      next( error );
    }
  };

  deleteDepartmentEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.deleteEmployee( req.params.id );
      res.redirect( `/departments/${req.params.name}/` );
    } catch ( error ) {
      next( error );
    }
  };

  showDepartmentEmployees = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const department = await this.departmentService.getDepartmentBySlug( req.params.name );
      const employees = await this.employeeService.getEmployees( { ...filters, companyId: req.user.company, departmentId: department.id }, sort, pagination );
      res.render( 'employees', { employees } );
    } catch ( error ) {
      next( error );
    }
  };

  updateDepartmentEmployee = async ( req, res, next ) => {
    try {
      const body = EmployeeQuerySchema.parse( req.body );
      const department = await this.departmentService.getDepartmentBySlug( req.params.name );
      await this.employeeService.updateEmployee( req.params.id, { ...body, departmentId: department.id } );
      res.redirect( `/departments/${req.params.name}/` );
    } catch ( error ) {
      next( error );
    }
  };

};