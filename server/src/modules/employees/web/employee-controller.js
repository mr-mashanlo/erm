export class EmployeeWebController {

  constructor( employeeService ) {
    this.employeeService = employeeService;
  };

  archiveEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.archiveEmployee( req.params.id, true );
      res.redirect( req.get( 'Referrer' ) || '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  assignEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.assignEmployee( req.params.id, req.body.employeeId );
      res.redirect( req.get( 'Referrer' ) || '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  createEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.createEmployee( { ...req.body, companyId: req.user.company } );
      res.redirect( req.get( 'Referrer' ) || '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.deleteEmployee( req.params.id );
      res.redirect( req.get( 'Referrer' ) || '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployees = async ( req, res, next ) => {
    try {
      const archivedEmployees = await this.employeeService.getEmployees( { companyId: req.user.company, archived: true, limit: '100' } );
      const employees = await this.employeeService.getEmployees( { ...req.query, archived: false } );
      res.render( 'employees', { employees, archivedEmployees } );
    } catch ( error ) {
      next( error );
    }
  };

  updateEmployee = async ( req, res, next ) => {
    try {
      await this.employeeService.updateEmployee( req.params.id, req.body );
      res.redirect( req.get( 'Referrer' ) || '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

};