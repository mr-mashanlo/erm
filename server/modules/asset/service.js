import slug from 'slug';

export class AssetService {

  constructor( assetRepository ) {
    this.assetRepository = assetRepository;
  };

  createType = async ( { name } ) => {
    return await this.assetRepository.create( { name, slug: slug( name ) } );
  };

  deleteType = async id => {
    await this.assetRepository.delete( { id } );
  };

  getTypes = async () => {
    return await this.assetRepository.find();
  };

  getTypeById = async id => {
    return await this.assetRepository.findById( { id } );
  };

  updateType = async ( id, body ) => {
    return await this.assetRepository.update( { id }, body );
  };

};