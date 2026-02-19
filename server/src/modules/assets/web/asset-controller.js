export class AssetWebController {

  constructor( assetService, employeeService ) {
    this.assetService = assetService;
    this.employeeService = employeeService;
  };

  create = async ( req, res, next ) => {
    try {
      await this.assetService.createAsset( req.body );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( req.params.id );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      await this.assetService.updateAsset( req.params.id, req.body );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  showAssets = async ( req, res, next ) => {
    try {
      const assets = await this.assetService.getAllAssets( {
        search: req.query.search,
        serialNumber: req.query.serialNumber,
        employee: req.query.employee,
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

  showAsset = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.getAssetById( req.params.id );
      res.render( 'assets', { asset } );
    } catch ( error ) {
      next( error );
    }
  };

};