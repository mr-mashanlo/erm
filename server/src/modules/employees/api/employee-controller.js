export class EmployeeApiController {

  constructor( employeeService ) {
    this.employeeService = employeeService;
  };

  createEmployee = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.createEmployee( req.body );
      res.json( employee );
    } catch ( error ) {
      next( error );
    }
  };

  deleteEmployee = async ( req, res, next ) => {
    try {
      const employee = await this.employeeService.deleteEmployee( req.params.id );
      res.json( employee );
    } catch ( error ) {
      next( error );
    }
  };

  getAllEmployees = async ( req, res, next ) => {
    try {
      const employees = await this.employeeService.getAllEmployees( {
        search: req.query.search,
        department: req.query.department,
        limit: req.query.limit,
        order: req.query.order,
        page: req.query.page,
        sort: req.query.sort
      } );
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