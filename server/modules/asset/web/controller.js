export class AssetWebController {

  constructor( assetService ) {
    this.assetService = assetService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      await this.assetService.createAsset( { ...req.body, companyId: req.params.company } );
      res.redirect( req.query.from ? req.query.from : req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( { id: req.params.id } );
      res.redirect( '/companies' );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      await this.typeService.updateAsset( req.params.id, req.body );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetsPage = async ( req, res, next ) => {
    try {
      const assets = await this.assetService.getAssets( { companyId: req.params.company, ...req.query } );
      res.render( 'asset/assets', { data: { assets } } );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetPage = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.getAssetById( req.params.id );
      res.render( 'asset/asset', { data: { asset } } );
    } catch ( error ) {
      next( error );
    }
  };

};