export class RoleRepository {

  constructor( db ) {
    this.db = db;
  }

  assignRole = async ( userId, roleId ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'userId', this.db.sql.Int, userId )
      .input( 'roleId', this.db.sql.Int, roleId )
      .query( 'INSERT INTO user_role (userId, roleId) OUTPUT inserted.* VALUES (@userId, @roleId)' );
    return result.recordset;
  };

  find = async companyId => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( 'SELECT * FROM roles WHERE companyId = @companyId' );
    return result.recordset;
  };

  findById = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'SELECT * FROM roles WHERE id = @id' );
    return result.recordset[0] || null;
  };

  seedDefaultRoles = async companyId => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( 'INSERT INTO roles (name, companyId) OUTPUT inserted.* VALUES (\'admin\', @companyId), (\'user\', @companyId)' );
    return result.recordset;
  };

}