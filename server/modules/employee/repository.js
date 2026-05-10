export class EmployeeRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  count = async where => {
    return await this.prisma.employee.count( { where } );
  };

  create = async data => {
    return await this.prisma.employee.create( { data } );
  };

  delete = async where => {
    return await this.prisma.employee.delete( { where } );
  };

  find = async ( { filters, sort, pagination } ) => {
    return await this.prisma.employee.findMany( {
      where: filters,
      orderBy: sort,
      take: pagination.limit,
      skip: pagination.skip
    } );
  };

  findOne = async where => {
    return await this.prisma.employee.findFirst( { where } );
  };

  findById = async id => {
    return await this.prisma.employee.findUnique( { where: { id } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.employee.update( { where, data } );
  };

}