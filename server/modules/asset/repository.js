export class AssetRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  count = async where => {
    return await this.prisma.asset.count( { where } );
  };

  create = async data => {
    return await this.prisma.asset.create( { data } );
  };

  delete = async where => {
    return await this.prisma.asset.delete( { where } );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.prisma.asset.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip,
      include: { company: true, type: true }
    } );
  };

  findOne = async where => {
    return await this.prisma.company.findFirst( { where } );
  };

  findById = async id => {
    return await this.prisma.asset.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.asset.update( { where, data } );
  };

}