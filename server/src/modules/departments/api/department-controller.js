export class DepartmentApiController {

  constructor( departmentService ) {
    this.departmentService = departmentService;
  };

  createDepartment = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.createDepartment( req.body );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

  deleteDepartment = async ( req, res, next ) => {
    try {
      const department = await this.departmentService.deleteDepartment( req.params.id );
      res.json( department );
    } catch ( error ) {
      next( error );
    }
  };

  getAllDepartments = async ( req, res, next ) => {
    try {
      const departments = await this.departmentService.getAllDepartments( {
        search: req.query.search,
        address: req.query.address,
        limit: req.query.limit,
        order: req.query.order,
        page: req.query.page,
        sort: req.query.sort
      } );
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