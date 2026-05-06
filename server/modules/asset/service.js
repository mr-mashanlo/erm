import slug from 'slug';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class AssetService {

  constructor( assetRepository ) {
    this.assetRepository = assetRepository;
  };

  createAsset = async ( { name } ) => {
    return await this.assetRepository.create( { name, slug: slug( name ) } );
  };

  deleteAsset = async id => {
    await this.assetRepository.delete( { id } );
  };

  getAssets = async query => {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.assetRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.assetRepository.count( filters );
    return { data, total, ...pagination };
  };

  getAssetById = async id => {
    return await this.assetRepository.findById( { id } );
  };

  updateAsset = async ( id, body ) => {
    return await this.assetRepository.update( { id }, body );
  };

};