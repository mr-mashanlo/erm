import { withTransaction } from '../../config/transaction.js';
import { PaginationQuerySchema } from '../../schemas/pagination-query-schema.js';
import { AssetSortingSchema, TypeFilteringSchema, TypeSchema } from './asset-schema.js';

export class AssetTypeService {

  constructor( assetTypeRepository ) {
    this.assetTypeRepository = assetTypeRepository;
  };

  createType = async body => {
    const type = TypeSchema.parse( body );
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
    const filters = TypeFilteringSchema.parse( query );
    const sort = AssetSortingSchema.parse( query );
    const pagination = PaginationQuerySchema.parse( query );
    return withTransaction( async () => {
      const types = await this.assetTypeRepository.find( filters, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      return { data: types, total: types ? types.length : 0, ...pagination };
    } );
  };

  updateType = async ( id, body ) => {
    const type = TypeSchema.pick( { name: true } ).parse( body );
    return withTransaction( async () => {
      return await this.assetTypeRepository.update( id, type );
    } );
  };

};