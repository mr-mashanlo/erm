export class HomeWebController {

  constructor( companyService, employeeService, assetService, assetTypeService ) {
    this.companyService = companyService;
    this.employeeService = employeeService;
    this.assetService = assetService;
    this.assetTypeService = assetTypeService;
  }

  showHome = async ( req, res, next ) => {
    try {
      const company = await this.companyService.getCompanyById( req.user.company );
      const employees = await this.employeeService.getEmployees( {} );
      const assets = await this.assetService.getAssets( { companyId: req.user.company, archived: false, limit: '100' } );
      const types = await this.assetTypeService.getTypes( { companyId: req.user.company, archived: false, limit: '100' } );
      res.render( 'index', { company, employees: employees.total, assets: assets.total, types: types.total } );
    } catch ( error ) {
      next( error );
    }
  };

};