export class AssetController {

  constructor( assetService ) {
    this.assetService = assetService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const document = await this.assetService.createAsset( req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
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

  getAssets = async ( req, res, next ) => {
    try {
      const document = await this.assetService.getAssets();
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getAssetById = async ( req, res, next ) => {
    try {
      const document = await this.assetService.getAssetById( req.params.id );
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

};