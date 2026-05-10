
import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class AssetAssignService {

  constructor( assetAssignRepository ) {
    this.assetAssignRepository = assetAssignRepository;
  };

  createAssetAssign = async body => {
    return await this.assetAssignRepository.create( body );
  };

  deleteAssetAssign = async query => {
    await this.assetAssignRepository.delete( query );
  };

  getAssetAssigns = async ( query = {} ) => {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.assetAssignRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.assetAssignRepository.count( filters );
    return { data, total, ...pagination };
  };

  getAssetAssignById = async id => {
    return await this.assetAssignRepository.findById( id );
  };

  updateAssetAssign = async ( id, body ) => {
    return await this.assetAssignRepository.update( { id }, body );
  };

};