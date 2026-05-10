export class UserRepository {

  constructor( prisma ) {
    this.prisma = prisma;
  };

  create = async data => {
    return await this.prisma.user.create( { data } );
  };

  find = async () => {
    return await this.prisma.user.findMany();
  };

  findById = async id => {
    return await this.prisma.user.findUnique( { where: { id } } );
  };

  findByEmail = async email => {
    return await this.prisma.user.findUnique( { where: { email } } );
  };

  findByToken = async refreshToken => {
    return await this.prisma.user.findFirst( { where: { refreshToken } } );
  };

  update = async ( where, data ) => {
    return await this.prisma.user.update( { where, data } );
  };

}