export class AssetWebController {

  constructor( assetService ) {
    this.assetService = assetService;
  };

  createAsset = async ( req, res ) => {
    try {
      await this.assetService.createAsset( req.body );
      res.redirect( '/assets' );
    } catch ( error ) {
      res.render( 'asset/assets', { assets: { data: [], total: 0, limit: 10, page: 1 }, errors: error.errors, body: req.body } );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      const document = await this.assetService.deleteAsset( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      const document = await this.assetService.updateAsset( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetsPage = async ( req, res, next ) => {
    try {
      const document = await this.assetService.getAssets( req.query );
      res.render( 'asset/assets', { assets: document, errors: [], body: {} } );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetPage = async ( req, res, next ) => {
    try {
      const document = await this.assetService.getAssetById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};