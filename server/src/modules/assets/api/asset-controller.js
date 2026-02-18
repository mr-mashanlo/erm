export class AssetApiController {

  constructor( assetService ) {
    this.assetService = assetService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.createAsset( req.body );
      res.json( asset );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      const asset = await this.assetService.deleteAsset( req.params.id );
      res.json( asset );
    } catch ( error ) {
      next( error );
    }
  };

  getAllAssets = async ( req, res, next ) => {
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