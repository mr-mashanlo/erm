export class AssetAssignApiController {

  constructor( assetAssignService ) {
    this.assetAssignService = assetAssignService;
  };

  createAssetAssign = async ( req, res, next ) => {
    try {
      const document = await this.assetAssignService.createAssetAssign( req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAssetAssign = async ( req, res, next ) => {
    try {
      const document = await this.assetAssignService.deleteAssetAssign( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getAssetAssigns = async ( req, res, next ) => {
    try {
      const document = await this.assetAssignService.getAssetAssigns( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getAssetAssignById = async ( req, res, next ) => {
    try {
      const document = await this.assetAssignService.getAssetAssignById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  updateAssetAssign = async ( req, res, next ) => {
    try {
      const document = await this.assetAssignService.updateAssetAssign( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};