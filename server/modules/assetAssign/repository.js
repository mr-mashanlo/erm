export class AssetAssignRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  count = async where => {
    return await this.prisma.assetAssign.count( { where } );
  };

  create = async data => {
    return await this.prisma.assetAssign.create( { data } );
  };

  delete = async where => {
    return await this.prisma.assetAssign.delete( { where } );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.prisma.assetAssign.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip,
      include: { employee: true, asset: true }
    } );
  };

  findOne = async where => {
    return await this.prisma.assetAssign.findFirst( { where } );
  };

  findById = async id => {
    return await this.prisma.assetAssign.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.assetAssign.update( { where, data } );
  };

}