export class DepartmentWebController {

  constructor( departmentService ) {
    this.departmentService = departmentService;
  };

  create = async ( req, res, next ) => {
    try {
      await this.departmentService.createDepartment( req.body );
      res.redirect( '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      await this.departmentService.deleteDepartment( req.params.id );
      res.redirect( '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      await this.departmentService.updateDepartment( req.params.id, req.body );
      res.redirect( '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  departments = async ( req, res, next ) => {
    try {
      const departments = await this.departmentService.getAllDepartments( {
        search: req.query.search,
        address: req.query.address,
        limit: req.query.limit,
        order: req.query.order,
        page: req.query.page,
        sort: req.query.sort
      } );
      res.render( 'departments', { departments } );
    } catch ( error ) {
      next( error );
    }
  };

  department = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.getDepartmentById( req.params.id );
      res.render( 'departments', { department } );
    } catch ( error ) {
      next( error );
    }
  };

};