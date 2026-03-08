import slug from 'slug';

export class DepartmentRepository {

  constructor( db ) {
    this.db = db;
  }

  count = async filters => {
    const executor = await this.db.getExecutor();
    const request = executor.request();
    let query = 'SELECT * FROM departments WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND departments.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND departments.companyId = @companyId';
    }

    const result = await request.query( query );
    return result.recordset.length;
  };

  create = async ( { name, companyId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( 'INSERT INTO departments (name, slug, companyId) OUTPUT inserted.* VALUES (@name, @slug, @companyId)' );
    return result.recordset[0] || null;
  };

  delete = async id => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM departments WHERE id = @id' );
    return { ok: true };
  };

  find = async ( filters, sort, pagination ) => {
    const executor = await this.db.getExecutor();
    const request = await executor.request();
    let query = 'SELECT * FROM departments WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND departments.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND departments.companyId = @companyId';
    }

    query += ` ORDER BY ${sort.sort} ${sort.order}`;
    query += ` OFFSET ${pagination.skip} ROWS FETCH NEXT ${pagination.limit} ROWS ONLY`;

    const result = await request.query( query );
    return result.recordset;
  };

  findById = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'SELECT * FROM departments WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findBySlug = async slug => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'slug', this.db.sql.NVarChar, slug )
      .query( 'SELECT * FROM departments WHERE slug = @slug' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .query( 'UPDATE departments SET name = @name, slug = @slug OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}