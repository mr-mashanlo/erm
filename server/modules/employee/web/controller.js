export class EmployeeWebController {

  constructor( employeeService ) {
    this.employeeService = employeeService;
  };

  createEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.createEmployee( { ...req.body, userId: req.user.id } );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.deleteEmployee( { id: req.params.id } );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  updateEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.updateEmployee( req.params.id, req.body );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployeesPage = async ( req, res, next ) => {
    try {
      const employees = await this.employeeService.getEmployees( { companyId: req.params.company, ...req.query } );
      res.render( 'employee/employees', { data: { employees } } );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployeePage = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.getEmployeeById( req.params.id );
      res.render( 'employee/employee', { data: { employee } } );
    } catch ( error ) {
      next( error );
    }
  };

};