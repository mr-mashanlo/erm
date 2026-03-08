import slug from 'slug';

export class CompanyRepository {

  constructor( db ) {
    this.db = db;
  }

  create = async ( { name } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'createdAt', this.db.sql.BigInt, Date.now() )
      .query( 'INSERT INTO companies (name, slug, createdAt) OUTPUT inserted.* VALUES (@name, @slug, @createdAt)' );
    return result.recordset[0] || null;
  };

  delete = async id => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM companies WHERE id = @id' );
    return { ok: true };
  };

  findById = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'SELECT * FROM companies WHERE id = @id' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .query( 'UPDATE companies SET name = @name, slug = @slug OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}