export class DepartmentRepository {

  constructor( db ) {
    this.db = db;
  };

  count = async ( { filters } ) => {
    const pool = await this.db.poolPromise;
    const request = pool.request();

    let query = 'SELECT COUNT(*) as total FROM departments WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND departments.name LIKE @name';
    }

    if ( filters.address ) {
      request.input( 'address', this.db.sql.NVarChar, filters.address );
      query += ' AND departments.address = @address';
    }

    const result = await request.query( query );

    return result.recordset[0].total;
  };

  create = async ( { name, address } ) => {
    const pool = await this.db.poolPromise;

    const result = await pool.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'address', this.db.sql.NVarChar, address )
      .query( 'INSERT INTO departments (name, address) OUTPUT inserted.* VALUES (@name, @address)' );

    return result.recordset[0] || null;
  };

  delete = async id => {
    const pool = await this.db.poolPromise;
    await pool.request().input( 'id', this.db.sql.Int, id ).query( 'DELETE FROM departments WHERE id = @id' );
    return { ok: true };
  };

  find = async ( { filters, sort, pagination } ) => {
    const pool = await this.db.poolPromise;
    const request = pool.request();

    let query = 'SELECT * FROM departments WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND departments.name LIKE @name';
    }

    if ( filters.address ) {
      request.input( 'address', this.db.sql.NVarChar, filters.address );
      query += ' AND departments.address = @address';
    }

    const sortField = Object.keys( sort )[0] || 'id';
    const sortOrder = sort[sortField] === -1 ? 'DESC' : 'ASC';
    query += ` ORDER BY departments.${sortField} ${sortOrder}`;

    if ( pagination.limit > 0 ) {
      request.input( 'offset', this.db.sql.Int, pagination.skip );
      request.input( 'limit', this.db.sql.Int, pagination.limit );
      query += ' OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';
    }

    const result = await request.query( query );

    return result.recordset;
  };

  findById = async id => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'id', this.db.sql.Int, id ).query( 'SELECT * FROM departments WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findByName = async name => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'name', this.db.sql.NVarChar, name ).query( 'SELECT * FROM departments WHERE name = @name' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name, address } ) => {
    const pool = await this.db.poolPromise;

    const result = await pool.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'address', this.db.sql.NVarChar, address )
      .query( 'UPDATE departments SET name = @name, address = @address OUTPUT inserted.* WHERE id = @id' );

    return result.recordset[0] || null;
  };

}