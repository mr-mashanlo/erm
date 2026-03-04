export class DepartmentWebController {

  constructor( departmentService ) {
    this.departmentService = departmentService;
  };

  createDepartment = async ( req, res, next ) => {
    try {
      await this.departmentService.createDepartment( { ...req.body, companyId: req.user.company } );
      res.redirect( req.get( 'Referrer' ) || '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteDepartment = async ( req, res, next ) => {
    try {
      await this.departmentService.deleteDepartment( req.params.id );
      res.redirect( req.get( 'Referrer' ) || '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

  showDepartments = async ( req, res, next ) => {
    try {
      const departments = await this.departmentService.getDepartments( { ...req.query, companyId: req.user.company } );
      res.render( 'departments', { departments } );
    } catch ( error ) {
      next( error );
    }
  };

  updateDepartment = async ( req, res, next ) => {
    try {
      await this.departmentService.updateDepartment( req.params.id, req.body );
      res.redirect( req.get( 'Referrer' ) || '/departments' );
    } catch ( error ) {
      next( error );
    }
  };

};