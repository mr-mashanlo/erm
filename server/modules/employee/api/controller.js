export class EmployeeApiController {

  constructor( employeeService ) {
    this.employeeService = employeeService;
  };

  createEmployee = async ( req, res, next ) => {
    try {
      const document = await this.employeeService.createEmployee( req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  deleteEmployee = async ( req, res, next ) => {
    try {
      const document = await this.employeeService.deleteEmployee( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getEmployees = async ( req, res, next ) => {
    try {
      const document = await this.employeeService.getEmployees( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getEmployeeById = async ( req, res, next ) => {
    try {
      const document = await this.employeeService.getEmployeeById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  updateEmployee = async ( req, res, next ) => {
    try {
      const document = await this.employeeService.updateEmployee( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};