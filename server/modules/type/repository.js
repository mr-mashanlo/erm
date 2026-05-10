export class TypeRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  count = async where => {
    return await this.prisma.type.count( { where } );
  };

  create = async data => {
    return await this.prisma.type.create( { data } );
  };

  delete = async where => {
    return await this.prisma.type.delete( { where } );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.prisma.type.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  findOne = async where => {
    return await this.prisma.type.findFirst( { where } );
  };

  findById = async id => {
    return await this.prisma.type.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.type.update( { where, data } );
  };

}