export class CompanyRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  create = async data => {
    return await this.prisma.company.create( { data } );
  };

  delete = async where => {
    return await this.prisma.company.delete( { where } );
  };

  find = async () => {
    return await this.prisma.company.findMany();
  };

  findById = async id => {
    return await this.prisma.company.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.company.update( { where, data } );
  };

}