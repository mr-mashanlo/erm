import slug from 'slug';

export class AssetTypeRepository {

  constructor( db ) {
    this.db = db;
  }

  create = async ( { name, companyId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( 'INSERT INTO asset_types (name, slug, companyId) OUTPUT inserted.* VALUES (@name, @slug, @companyId)' );
    return result.recordset[0] || null;
  };

  delete = async ( id ) => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM asset_types WHERE id = @id' );
    return { ok: true };
  };

  find = async ( filters ) => {
    const executor = await this.db.getExecutor();
    const request = await executor.request();
    let query = 'SELECT * FROM asset_types WHERE 1 = 1';

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND asset_types.companyId = @companyId';
    }

    const result = await request.query( query );
    return result.recordset;
  };

  seedDefaultAssets = async ( companyId ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( 'INSERT INTO asset_types (name, slug, companyId) OUTPUT inserted.* VALUES (\'Laptop\', \'laptop\', @companyId), (\'Keyboard\', \'keyboard\', @companyId), (\'Mouse\', \'mouse\', @companyId)' );
    return result.recordset;
  };

  update = async ( id, { name } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .query( 'UPDATE asset_types SET name = @name slug = @slug OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}