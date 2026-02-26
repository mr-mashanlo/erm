import { withTransaction } from '../../config/transaction.js';

export class AssetService {

  constructor( assetRepository, assetTypeRepository ) {
    this.assetRepository = assetRepository;
    this.assetTypeRepository = assetTypeRepository;
  };

  createAsset = async ( asset ) => {
    return withTransaction( async () => {
      return await this.assetRepository.create( asset );
    } );
  };

  deleteAsset = async ( id ) => {
    return withTransaction( async () => {
      await this.assetRepository.delete( id );
    } );
  };

  getAssets = async ( filter, sort, pagination ) => {
    return withTransaction( async () => {
      const assets = await this.assetRepository.find( filter, sort, { ...pagination, skip: ( pagination.page - 1 ) * pagination.limit } );
      const total = await this.assetRepository.count( filter );
      return { data: assets, total, ...pagination };
    } );
  };

  getAssetById = async ( id ) => {
    return withTransaction( async () => {
      return await this.assetRepository.findById( id );
    } );
  };

  updateAsset = async ( id, asset ) => {
    return withTransaction( async () => {
      return await this.assetRepository.update( id, asset );
    } );
  };

  createType = async ( asset ) => {
    return withTransaction( async () => {
      return await this.assetTypeRepository.create( asset );
    } );
  };

  deleteType = async ( id ) => {
    return withTransaction( async () => {
      await this.assetTypeRepository.delete( id );
    } );
  };

  getTypes = async ( filter ) => {
    return withTransaction( async () => {
      return await this.assetTypeRepository.find( filter );
    } );
  };

  updateType = async ( id, asset ) => {
    return withTransaction( async () => {
      return await this.assetTypeRepository.update( id, asset );
    } );
  };

  assignAssetToEmployee = async ( assetId, employeeId ) => {
    return withTransaction( async () => {
      return await this.assetRepository.assign( assetId, employeeId );
    } );
  };

  returnAssetFromEmployee = async ( id ) => {
    return withTransaction( async () => {
      return await this.assetRepository.return( id );
    } );
  };

};