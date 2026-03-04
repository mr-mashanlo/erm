export class EmployeeApiController {

  constructor( employeeService ) {
    this.employeeService = employeeService;
  };

  createEmployee = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.createEmployee( { ...req.body, companyId: req.user.company } );
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
      const employees = await this.employeeService.getEmployees( { ...req.query, companyId: req.user.company } );
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
      const employee = await this.employeeService.updateEmployee( req.params.id, req.body );
      res.json( employee );
    } catch ( error ) {
      next( error );
    }
  };

};