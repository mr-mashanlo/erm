import { withTransaction } from '../../config/transaction.js';
import { PaginationQuerySchema } from '../../schemas/pagination-query-schema.js';
import { AssetFilteringSchema, AssetSchema, AssetSortingSchema } from './asset-schema.js';

export class AssetService {

  constructor( assetRepository ) {
    this.assetRepository = assetRepository;
  };

  archiveAsset = async ( id, archive ) => {
    return withTransaction( async () => {
      return await this.assetRepository.archive( id, archive );
    } );
  };

  assignAsset = async ( employeeId, assetId ) => {
    return withTransaction( async () => {
      return await this.assetRepository.assign( employeeId, assetId );
    } );
  };

  createAsset = async body => {
    const asset = AssetSchema.parse( body );
    return withTransaction( async () => {
      return await this.assetRepository.create( asset );
    } );
  };

  deleteAsset = async id => {
    return withTransaction( async () => {
      await this.assetRepository.delete( id );
    } );
  };

  getAssets = async query => {
    const filters = AssetFilteringSchema.parse( query );
    const sort = AssetSortingSchema.parse( query );
    const pagination = PaginationQuerySchema.parse( query );
    return withTransaction( async () => {
      const assets = await this.assetRepository.find( filters, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      return { data: assets, total: assets ? assets.length : 0, ...pagination };
    } );
  };

  getAssetById = async id => {
    return withTransaction( async () => {
      return await this.assetRepository.findById( id );
    } );
  };

  updateAsset = async ( id, body ) => {
    const asset = AssetSchema.pick( { name: true, serialNumber: true, typeId: true } ).parse( body );
    return withTransaction( async () => {
      return await this.assetRepository.update( id, asset );
    } );
  };

  moveAsset = async ( assetId, employeeId, assignId ) => {
    return withTransaction( async () => {
      await this.assetRepository.return( assignId );
      return await this.assetRepository.assign( employeeId, assetId );
    } );
  };

  returnAsset = async id => {
    return withTransaction( async () => {
      return await this.assetRepository.return( id );
    } );
  };

};