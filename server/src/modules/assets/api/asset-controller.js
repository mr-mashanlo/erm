export class AssetApiController {

  constructor( assetService ) {
    this.assetService = assetService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.createAsset( { ...req.body, companyId: req.user.company } );
      res.json( asset );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( req.params.id );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

  getAssets = async ( req, res, next ) => {
    try {
      const assets = await this.assetService.getAssets( { ...req.query, companyId: req.user.company } );
      res.json( assets );
    } catch ( error ) {
      next( error );
    }
  };

  getAssetById = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.getAssetById( req.params.id );
      res.json( asset );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.updateAsset( req.params.id, req.body );
      res.json( asset );
    } catch ( error ) {
      next( error );
    }
  };

};