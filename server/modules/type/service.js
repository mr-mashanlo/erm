import slug from 'slug';

export class TypeService {

  constructor( typeRepository ) {
    this.typeRepository = typeRepository;
  };

  createType = async ( { name } ) => {
    return await this.typeRepository.create( { name, slug: slug( name ) } );
  };

  deleteType = async id => {
    await this.typeRepository.delete( { id } );
  };

  getTypes = async () => {
    return await this.typeRepository.find();
  };

  getTypeById = async id => {
    return await this.typeRepository.findById( { id } );
  };

  updateType = async ( id, body ) => {
    return await this.typeRepository.update( { id }, body );
  };

};