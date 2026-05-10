export class AssetAssignWebController {

  constructor( assetAssignService ) {
    this.assetAssignService = assetAssignService;
  };

  createAssetAssign = async ( req, res, next ) => {
    try {
      await this.assetAssignService.createAssetAssign( { ...req.body, userId: req.user.id } );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAssetAssign = async ( req, res, next ) => {
    try {
      await this.assetAssignService.deleteAssetAssign( { id: req.params.id } );
      res.redirect( '/employees' );
    } catch ( error ) {
      next( error );
    }
  };

  updateAssetAssign = async ( req, res, next ) => {
    try {
      await this.assetAssignService.updateAssetAssign( req.params.id, req.body );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetAssignsPage = async ( req, res, next ) => {
    try {
      const employees = await this.assetAssignService.getAssetAssigns( { companyId: req.params.company, ...req.query } );
      res.render( 'employee/employees', { data: { employees } } );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetAssignPage = async ( req, res, next ) => {
    try {
      const employee = await this.assetAssignService.getAssetAssignById( req.params.id );
      res.render( 'employee/employee', { data: { employee } } );
    } catch ( error ) {
      next( error );
    }
  };

};