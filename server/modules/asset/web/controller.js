export class AssetWebController {

  constructor( assetService, typeService, companyService ) {
    this.assetService = assetService;
    this.typeService = typeService;
    this.companyService = companyService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      await this.assetService.createAsset( { ...req.body, userId: req.user.id } );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( { id: req.params.id } );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      await this.assetService.updateAsset( req.params.id, req.body );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetsPage = async ( req, res, next ) => {
    try {
      const companies = await this.companyService.getCompanies( { limit: '1000' } );
      const types = await this.typeService.getTypes( { limit: '1000' } );
      const assets = await this.assetService.getAssets( { ...req.query, userId: req.user.id } );
      res.render( 'asset/assets', { data: { companies, types, assets } } );
    } catch ( error ) {
      next( error );
    }
  };

  showAssetPage = async ( req, res, next ) => {
    try {
      const companies = await this.companyService.getCompanies( { limit: '1000' } );
      const types = await this.typeService.getTypes( { limit: '1000' } );
      const asset = await this.assetService.getAssetById( req.params.id );
      res.render( 'asset/asset', { data: { companies, types, asset } } );
    } catch ( error ) {
      next( error );
    }
  };

};