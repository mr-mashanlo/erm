export class EmployeeWebController {

  constructor( employeeService, departmentService, assetService ) {
    this.employeeService = employeeService;
    this.departmentService = departmentService;
    this.assetService = assetService;
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
      res.render( 'employees', { employees, departments } );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployee = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.getEmployeeById( req.params.id );
      res.render( 'employees', { employee } );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployeeAssets = async ( req, res, next ) => {
    try {
      const assets = await this.assetService.getAllAssets( {
        search: req.query.search,
        serialNumber: req.query.serialNumber,
        employee: req.params.id,
        limit: req.query.limit,
        order: req.query.order,
        page: req.query.page,
        sort: req.query.sort
      } );
      const employees = await this.employeeService.getAllEmployees( { limit: '0' } );
      res.render( 'assets', { assets, employees } );
    } catch ( error ) {
      next( error );
    }
  };

};