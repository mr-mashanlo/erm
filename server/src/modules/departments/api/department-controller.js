export class DepartmentApiController {

  constructor( departmentService ) {
    this.departmentService = departmentService;
  };

  createDepartment = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.createDepartment( { ...req.body, companyId: req.user.company } );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

  deleteDepartment = async ( req, res, next ) => {
    try {
      await this.departmentService.deleteDepartment( req.params.id );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  getDepartments = async ( req, res, next ) => {
    try {
      const departments = await this.departmentService.getDepartments( { ...req.query, companyId: req.user.company } );
      res.json( departments );
    } catch ( error ) {
      next( error );
    }
  };

  getDepartmentById = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.getDepartmentById( req.params.id );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

  updateDepartment = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.updateDepartment( req.params.id, req.body );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

};