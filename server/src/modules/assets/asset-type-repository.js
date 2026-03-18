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

  delete = async id => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM asset_types WHERE id = @id' );
    return { ok: true };
  };

  find = async ( filters, sort, pagination ) => {
    const executor = await this.db.getExecutor();
    const request = await executor.request();
    let query = `
      SELECT asset_types.*, (
        SELECT assets.id
        FROM assets
        WHERE assets.typeId = asset_types.id
        FOR JSON AUTO
      ) as assets
      FROM asset_types
      WHERE 1 = 1
    `;

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND asset_types.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND asset_types.companyId = @companyId';
    }

    query += ` ORDER BY ${sort.sort} ${sort.order}`;
    query += ` OFFSET ${pagination.skip} ROWS FETCH NEXT ${pagination.limit} ROWS ONLY`;

    const result = await request.query( query );
    return result.recordset.map( raw => ( {
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      assets: JSON.parse( raw.assets )
    } ) );
  };

  seedDefaultAssets = async companyId => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( `INSERT INTO asset_types (name, slug, companyId) OUTPUT inserted.* VALUES
          ('Camera', 'camera', @companyId),
          ('Headset', 'headset', @companyId),
          ('Keyboard', 'keyboard', @companyId),
          ('Laptop', 'laptop', @companyId),
          ('Mouse', 'mouse', @companyId),
          ('Phone', 'phone', @companyId),
          ('Printer', 'printer', @companyId),
          ('Scanner', 'scanner', @companyId)
        ` );
    return result.recordset;
  };

  update = async ( id, { name } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .query( 'UPDATE asset_types SET name = @name, slug = @slug OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}