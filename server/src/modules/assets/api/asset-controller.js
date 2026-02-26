import { FilteringQuerySchema, PaginationQuerySchema, SortingQuerySchema } from '../../../schemas/filter-query-schema.js';
import { AssetQuerySchema } from '../asset-schema.js';

export class AssetApiController {

  constructor( assetService ) {
    this.assetService = assetService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const body = AssetQuerySchema.parse( req.body );
      const asset = await this.assetService.createAsset( { ...body, companyId: req.user.company } );
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
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const assets = await this.assetService.getAssets( { ...filters, companyId: req.user.company }, sort, pagination );
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
      const body = AssetQuerySchema.parse( req.body );
      const asset = await this.assetService.updateAsset( req.params.id, body );
      res.json( asset );
    } catch ( error ) {
      next( error );
    }
  };

};