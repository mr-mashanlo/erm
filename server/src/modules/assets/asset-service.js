export class AssetService {

  constructor( assetRepository ) {
    this.assetRepository = assetRepository;
  };

  createAsset = async asset => {
    return await this.assetRepository.create( asset );
  };

  deleteAsset = async id => {
    return await this.assetRepository.delete( id );
  };

  getAllAssets = async query => {
    const filters = {};
    const sort = {};
    const pagination = {};

    if ( query.search ) {
      filters.search = query.search;
    }

    if ( query.serialNumber ) {
      filters.serialNumber = query.serialNumber;
    }

    if ( query.employee ) {
      filters.employee = query.employee;
    }

    const allowedSortFields = [ 'name', 'serialNumber' ];
    const sortField = allowedSortFields.includes( query.sort ) ? query.sort : 'id';
    sort[sortField] = query.order === 'desc' ? -1 : 1;

    const page = Number( query.page ) || 1;
    pagination.limit = Math.min( Number( query.limit || 10 ), 100 );
    pagination.skip = ( page - 1 ) * pagination.limit;

    const asset = await this.assetRepository.find( { filters, sort, pagination } );
    const total = await this.assetRepository.count( { filters } );

    return { data: asset, total, page, limit: pagination.limit };
  };

  getAssetById = async id => {
    return await this.assetRepository.findById( id );
  };

  updateAsset = async ( id, asset ) => {
    return await this.assetRepository.update( id, asset );
  };

};