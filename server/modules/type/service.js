import generateSlug from 'slug';

import { FilteringSchema, PaginationSchema, SortingSchema } from './schema.js';

export class TypeService {

  constructor( typeRepository ) {
    this.typeRepository = typeRepository;
  };

  createType = async body => {
    return await this.typeRepository.create( { ...body, slug: generateSlug( body.name ) } );
  };

  deleteType = async query => {
    await this.typeRepository.delete( query );
  };

  getTypes = async ( query = {} ) => {
    const filters = FilteringSchema.parse( query );
    const sort = SortingSchema.parse( query );
    const pagination = PaginationSchema.parse( query );
    const data = await this.typeRepository.find( { filters, sort: { [sort.sort]: sort.order }, pagination: { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } } );
    const total = await this.typeRepository.count( filters );
    return { data, total, ...pagination };
  };

  getType = async query => {
    return await this.typeRepository.findOne( query );
  };

  getTypeById = async id => {
    return await this.typeRepository.findById( id );
  };

  updateType = async ( id, body ) => {
    return await this.typeRepository.update( { id }, { ...body, slug: generateSlug( body.name ) } );
  };

};