export class EmployeeWebController {

  constructor( employeeService, departmentService ) {
    this.employeeService = employeeService;
    this.departmentService = departmentService;
  };

  create = async ( req, res, next ) => {
    try {
      await this.employeeService.createEmployee( req.body );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      await this.employeeService.deleteEmployee( req.params.id );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      await this.employeeService.updateEmployee( req.params.id, req.body );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployees = async ( req, res, next ) => {
    try {
      const employees = await this.employeeService.getAllEmployees( {
        search: req.query.search,
        department: req.query.department,
        limit: req.query.limit,
        order: req.query.order,
        page: req.query.page,
        sort: req.query.sort
      } );
      const departments = await this.departmentService.getAllDepartments( { limit: '0' } );
      res.render( 'employees', { employees, departments, user: req.user || {} } );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployee = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.getEmployeeById( req.params.id );
      res.render( 'employees', { employee, user: req.user || {} } );
    } catch ( error ) {
      next( error );
    }
  };

};