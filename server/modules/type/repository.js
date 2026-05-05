export class TypeRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  create = async data => {
    return await this.prisma.type.create( { data } );
  };

  delete = async where => {
    return await this.prisma.type.delete( { where } );
  };

  find = async () => {
    return await this.prisma.type.findMany();
  };

  findById = async id => {
    return await this.prisma.type.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.type.update( { where, data } );
  };

}