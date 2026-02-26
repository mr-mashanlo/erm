import slug from 'slug';

export class EmployeeRepository {

  constructor( db ) {
    this.db = db;
  }

  count = async ( filters ) => {
    const executor = await this.db.getExecutor();
    const request = executor.request();
    let query = 'SELECT * FROM employees WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND employees.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND employees.companyId = @companyId';
    }

    if ( filters.departmentId ) {
      request.input( 'departmentId', this.db.sql.Int, filters.departmentId );
      query += ' AND employees.departmentId = @departmentId';
    }

    const result = await request.query( query );
    return result.recordset.length;
  };

  create = async ( { name, companyId, departmentId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'companyId', this.db.sql.Int, companyId )
      .input( 'departmentId', this.db.sql.Int, departmentId )
      .input( 'createdAt', this.db.sql.BigInt, Date.now() )
      .query( 'INSERT INTO employees (name, slug, companyId, departmentId, createdAt) OUTPUT inserted.* VALUES (@name, @slug, @companyId, @departmentId, @createdAt)' );
    return result.recordset[0] || null;
  };

  delete = async ( id ) => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM employees WHERE id = @id' );
    return { ok: true };
  };

  find = async ( filters, sort, pagination ) => {
    const executor = await this.db.getExecutor();
    const request = await executor.request();
    let query = 'SELECT * FROM employees WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND employees.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND employees.companyId = @companyId';
    }

    if ( filters.departmentId ) {
      request.input( 'departmentId', this.db.sql.Int, filters.departmentId );
      query += ' AND employees.departmentId = @departmentId';
    }

    query += ` ORDER BY ${sort.sort} ${sort.order}`;
    query += ` OFFSET ${pagination.skip} ROWS FETCH NEXT ${pagination.limit} ROWS ONLY`;

    const result = await request.query( query );
    return result.recordset;
  };

  findById = async ( id ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'SELECT * FROM employees WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findBySlug = async ( slug ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'slug', this.db.sql.NVarChar, slug )
      .query( 'SELECT * FROM employees WHERE slug = @slug' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name, departmentId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'departmentId', this.db.sql.Int, departmentId )
      .query( 'UPDATE employees SET name = @name, slug = @slug, departmentId = @departmentId OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}