export class AssetWebController {

  constructor( assetService, assetAssignService, employeeService, typeService, companyService ) {
    this.assetService = assetService;
    this.assetAssignService = assetAssignService;
    this.employeeService = employeeService;
    this.typeService = typeService;
    this.companyService = companyService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const { employeeId, ...body } = req.body;
      const asset = await this.assetService.createAsset( { ...body, userId: req.user.id } );
      await this.assetAssignService.createAssetAssign( { assetId: asset.id, employeeId } );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( { id: req.params.id } );
      res.redirect( '/assetss' );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      const { employeeId, currentEmployeeId, assetAssignId, ...body } = req.body;
      await this.assetService.updateAsset( req.params.id, body );
      if ( employeeId !== currentEmployeeId ) {
        await this.assetAssignService.updateAssetAssign( assetAssignId, { endDate: new Date(), archived: true } );
        await this.assetAssignService.createAssetAssign( { assetId: req.params.id, employeeId } );
      }
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetsPage = async ( req, res, next ) => {
    try {
      const companies = await this.companyService.getCompanies( { userId: req.user.id, limit: '1000' } );
      const types = await this.typeService.getTypes( { userId: req.user.id, limit: '1000' } );
      const employees = await this.employeeService.getEmployees( { userId: req.user.id, limit: '1000' } );
      const assets = await this.assetService.getAssets( { ...req.query, userId: req.user.id } );
      res.render( 'asset/assets', { data: { companies, types, employees, assets } } );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetPage = async ( req, res, next ) => {
    try {
      const companies = await this.companyService.getCompanies( { userId: req.user.id, limit: '1000' } );
      const types = await this.typeService.getTypes( { userId: req.user.id, limit: '1000' } );
      const employees = await this.employeeService.getEmployees( { userId: req.user.id, limit: '1000' } );
      const asset = await this.assetService.getAssetById( req.params.id );
      const assetAssigns = await this.assetAssignService.getAssetAssigns( { assetId: asset.id } );
      res.render( 'asset/asset', { data: { companies, types, employees, asset, assetAssigns } } );
    } catch ( error ) {
      next( error );
    }
  };

};