export class AssetApiController {

  constructor( assetService, assetAssignService ) {
    this.assetService = assetService;
    this.assetAssignService = assetAssignService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const { employeeId, ...body } = req.body;
      const asset = await this.assetService.createAsset( { ...body, userId: req.user.id } );
      await this.assetAssignService.createAssetAssign( { assetId: asset.id, employeeId } );
      res.json( asset );
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
      const document = await this.assetService.getAssets( { ...req.query, userId: req.user.id } );
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