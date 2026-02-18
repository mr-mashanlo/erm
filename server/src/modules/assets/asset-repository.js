export class AssetRepository {

  constructor( db ) {
    this.db = db;
  };

  count = async ( { filters } ) => {
    const pool = await this.db.poolPromise;
    const request = pool.request();

    let query = 'SELECT COUNT(*) as total FROM assets WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND assets.name LIKE @name';
    }

    if ( filters.serialNumber ) {
      request.input( 'serialNumber', this.db.sql.NVarChar, filters.serialNumber );
      query += ' AND assets.serialNumber = @serialNumber';
    }

    if ( filters.employee ) {
      request.input( 'employee', this.db.sql.NVarChar, filters.employee );
      query += ' AND assets.employeeId = @employee';
    }

    const result = await request.query( query );

    return result.recordset[0].total;
  };

  create = async ( { name, serialNumber, employeeId } ) => {
    const pool = await this.db.poolPromise;

    const result = await pool.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'serialNumber', this.db.sql.NVarChar, serialNumber )
      .input( 'employeeId', this.db.sql.Int, employeeId )
      .query( 'INSERT INTO assets (name, serialNumber, employeeId) OUTPUT inserted.* VALUES (@name, @serialNumber, @employeeId)' );

    return result.recordset[0] || null;
  };

  delete = async id => {
    const pool = await this.db.poolPromise;
    await pool.request().input( 'id', this.db.sql.Int, id ).query( 'DELETE FROM assets WHERE id = @id' );
    return { ok: true };
  };

  find = async ( { filters, sort, pagination } ) => {
    const pool = await this.db.poolPromise;
    const request = pool.request();

    let query = `SELECT assets.*, employees.name AS employeeName
    FROM assets
    LEFT JOIN employees ON assets.employeeId = employees.id
    WHERE 1 = 1`;

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND assets.name LIKE @name';
    }

    if ( filters.serialNumber ) {
      request.input( 'serialNumber', this.db.sql.NVarChar, filters.serialNumber );
      query += ' AND assets.serialNumber = @serialNumber';
    }

    if ( filters.employee ) {
      request.input( 'employee', this.db.sql.NVarChar, filters.employee );
      query += ' AND assets.employeeId = @employee';
    }

    const sortField = Object.keys( sort )[0] || 'id';
    const sortOrder = sort[sortField] === -1 ? 'DESC' : 'ASC';
    query += ` ORDER BY assets.${sortField} ${sortOrder}`;

    if ( pagination.limit > 0 ) {
      request.input( 'offset', this.db.sql.Int, pagination.skip );
      request.input( 'limit', this.db.sql.Int, pagination.limit );
      query += ' OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';
    }

    const result = await request.query( query );

    return result.recordset.map( row => ( {
      id: row.id,
      name: row.name,
      serialNumber: row.serialNumber,
      employee: {
        id: row.employeeId,
        name: row.employeeName
      }
    } ) );
  };

  findById = async id => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'id', this.db.sql.Int, id ).query( 'SELECT * FROM assets WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findByName = async name => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'name', this.db.sql.NVarChar, name ).query( 'SELECT * FROM assets WHERE name = @name' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name, serialNumber, employeeId } ) => {
    const pool = await this.db.poolPromise;

    const result = await pool.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'serialNumber', this.db.sql.NVarChar, serialNumber )
      .input( 'employeeId', this.db.sql.Int, employeeId )
      .query( 'UPDATE assets SET name = @name, serialNumber = @serialNumber, employeeId = @employeeId OUTPUT inserted.* WHERE id = @id' );

    return result.recordset[0] || null;
  };

}