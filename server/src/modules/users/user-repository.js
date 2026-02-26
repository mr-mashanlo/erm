export class UserRepository {

  constructor( db ) {
    this.db = db;
  };

  create = async ( { email, password, companyId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'email', this.db.sql.NVarChar, email )
      .input( 'password', this.db.sql.NVarChar, password )
      .input( 'companyId', this.db.sql.Int, companyId )
      .input( 'createdAt', this.db.sql.BigInt, Date.now() )
      .query( 'INSERT INTO users (email, password, companyId, createdAt) OUTPUT inserted.* VALUES (@email, @password, @companyId, @createdAt)' );
    return result.recordset[0] || null;
  };

  findById = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( `
        SELECT users.*, companies.name as companyName, roles.id as roleId, roles.name as roleName
        FROM users
        LEFT JOIN user_role ON users.id = user_role.userId
        LEFT JOIN roles ON roles.id = user_role.roleId
        LEFT JOIN companies ON users.companyId = companies.id
        WHERE id = @id
      ` );
    const row = result.recordset[0];
    if ( !row ) return null;
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      expiredAt: row.expiredAt,
      role: { id: row.roleId, name: row.roleName },
      company: { id: row.companyId, name: row.companyName }
    };
  };

  findByEmail = async email => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'email', this.db.sql.NVarChar, email )
      .query( `
        SELECT users.*, companies.name as companyName, roles.id as roleId, roles.name as roleName
        FROM users
        LEFT JOIN user_role ON users.id = user_role.userId
        LEFT JOIN roles ON roles.id = user_role.roleId
        LEFT JOIN companies ON users.companyId = companies.id
        WHERE email = @email
      ` );
    const row = result.recordset[0];
    if ( !row ) return null;
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      expiredAt: row.expiredAt,
      role: { id: row.roleId, name: row.roleName },
      company: { id: row.companyId, name: row.companyName }
    };
  };

  findByRefreshToken = async refreshToken => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'refreshToken', this.db.sql.NVarChar, refreshToken )
      .query( `
        SELECT users.*, companies.name as companyName, roles.id as roleId, roles.name as roleName
        FROM users
        LEFT JOIN user_role ON users.id = user_role.userId
        LEFT JOIN roles ON roles.id = user_role.roleId
        LEFT JOIN companies ON users.companyId = companies.id
        WHERE refreshToken = @refreshToken
      ` );
    const row = result.recordset[0];
    if ( !row ) return null;
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      expiredAt: row.expiredAt,
      role: { id: row.roleId, name: row.roleName },
      company: { id: row.companyId, name: row.companyName }
    };
  };

  linkUserToEmployee = async ( userId, employeeId ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'userId', this.db.sql.Int, userId )
      .input( 'employeeId', this.db.sql.Int, employeeId )
      .query( 'INSERT INTO user_employee (userId, employeeId) OUTPUT inserted.* VALUES (@userId, @employeeId)' );
    return result.recordset[0] || null;
  };

  clearRefreshToken = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'refreshToken', this.db.sql.NVarChar, null )
      .input( 'expiredAt', this.db.sql.BigInt, null )
      .query( 'UPDATE users SET refreshToken = @refreshToken, expiredAt = @expiredAt OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

  updateRefreshToken = async ( id, refreshToken ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'refreshToken', this.db.sql.NVarChar, refreshToken )
      .input( 'expiredAt', this.db.sql.BigInt, Date.now() + +process.env.COOKIE_REFRESH_TIME )
      .query( 'UPDATE users SET refreshToken = @refreshToken, expiredAt = @expiredAt OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}