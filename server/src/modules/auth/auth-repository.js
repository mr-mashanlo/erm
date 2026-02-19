export class AuthRepository {

  constructor( db ) {
    this.db = db;
  };

  create = async ( { email, password, role } ) => {
    const pool = await this.db.poolPromise;
    const result = await pool.request()
      .input( 'email', this.db.sql.NVarChar, email )
      .input( 'password', this.db.sql.NVarChar, password )
      .input( 'role', this.db.sql.NVarChar, role )
      .query( 'INSERT INTO users (email, password, role) OUTPUT inserted.* VALUES (@email, @password, @role)' );
    return result.recordset[0] || null;
  };

  findById = async id => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'id', this.db.sql.Int, id ).query( 'SELECT * FROM users WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findByEmail = async email => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'email', this.db.sql.NVarChar, email ).query( 'SELECT * FROM users WHERE email = @email' );
    return result.recordset[0] || null;
  };

  findByRefreshToken = async refreshToken => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'refreshToken', this.db.sql.NVarChar, refreshToken ).query( 'SELECT * FROM users WHERE refreshToken = @refreshToken' );
    return result.recordset[0] || null;
  };

  updateRefreshToken = async ( id, refreshToken ) => {
    const pool = await this.db.poolPromise;
    const result = await pool.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'refreshToken', this.db.sql.NVarChar, refreshToken )
      .input( 'expiredAt', this.db.sql.BigInt, Date.now() + +process.env.COOKIE_REFRESH_TIME )
      .query( 'UPDATE users SET refreshToken = @refreshToken, expiredAt = @expiredAt OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

  clearRefreshToken = async id => {
    const pool = await this.db.poolPromise;
    const result = await pool.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'refreshToken', this.db.sql.NVarChar, null )
      .input( 'expiredAt', this.db.sql.BigInt, null )
      .query( 'UPDATE users SET refreshToken = @refreshToken, expiredAt = @expiredAt OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}