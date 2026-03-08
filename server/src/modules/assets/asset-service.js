import { withTransaction } from '../../config/transaction.js';
import { PaginationQuerySchema, SortingQuerySchema } from '../../schemas/filter-query-schema.js';
import { AssetQuerySchema, FilteringQuerySchema, FilteringTypeQuerySchema, TypeQuerySchema } from './asset-schema.js';

export class AssetService {

  constructor( assetRepository, assetTypeRepository ) {
    this.assetRepository = assetRepository;
    this.assetTypeRepository = assetTypeRepository;
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
    const asset = AssetQuerySchema.parse( body );
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
    const filters = FilteringQuerySchema.parse( query );
    const sort = SortingQuerySchema.parse( query );
    const pagination = PaginationQuerySchema.parse( query );
    return withTransaction( async () => {
      const assets = await this.assetRepository.find( filters, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      const total = await this.assetRepository.count( filters );
      return { data: assets, total, ...pagination };
    } );
  };

  getAssetById = async id => {
    return withTransaction( async () => {
      return await this.assetRepository.findById( id );
    } );
  };

  updateAsset = async ( id, body ) => {
    const asset = AssetQuerySchema.parse( body );
    return withTransaction( async () => {
      return await this.assetRepository.update( id, asset );
    } );
  };

  createType = async body => {
    const type = TypeQuerySchema.parse( body );
    return withTransaction( async () => {
      return await this.assetTypeRepository.create( type );
    } );
  };

  deleteType = async id => {
    return withTransaction( async () => {
      await this.assetTypeRepository.delete( id );
    } );
  };

  getTypes = async query => {
    const filters = FilteringTypeQuerySchema.parse( query );
    const sort = SortingQuerySchema.parse( query );
    const pagination = PaginationQuerySchema.parse( query );
    return withTransaction( async () => {
      const types = await this.assetTypeRepository.find( filters, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      const total = await this.assetTypeRepository.count( filters );
      return { data: types, total, ...pagination };
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

  updateType = async ( id, body ) => {
    const type = TypeQuerySchema.parse( body );
    return withTransaction( async () => {
      return await this.assetTypeRepository.update( id, type );
    } );
  };

};