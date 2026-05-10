export class CompanyRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  count = async where => {
    return await this.prisma.company.count( { where } );
  };

  create = async data => {
    return await this.prisma.company.create( { data } );
  };

  delete = async where => {
    return await this.prisma.company.delete( { where } );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.prisma.company.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  findOne = async where => {
    return await this.prisma.company.findFirst( { where } );
  };

  findById = async id => {
    return await this.prisma.company.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.company.update( { where, data } );
  };

}