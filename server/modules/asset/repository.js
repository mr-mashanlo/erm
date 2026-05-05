export class AssetRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  create = async data => {
    return await this.prisma.asset.create( { data } );
  };

  delete = async where => {
    return await this.prisma.asset.delete( { where } );
  };

  find = async () => {
    return await this.prisma.asset.findMany();
  };

  findById = async id => {
    return await this.prisma.asset.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.asset.update( { where, data } );
  };

}