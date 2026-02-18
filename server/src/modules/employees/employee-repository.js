export class EmployeeRepository {

  constructor( db ) {
    this.db = db;
  };

  count = async ( { filters } ) => {
    const pool = await this.db.poolPromise;
    const request = pool.request();

    let query = 'SELECT COUNT(*) as total FROM employees WHERE 1=1';

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND employees.name LIKE @name';
    }

    if ( filters.department ) {
      request.input( 'department', this.db.sql.Int, filters.department );
      query += ' AND employees.departmentId = @department';
    }

    const result = await request.query( query );

    return result.recordset[0].total;
  };

  create = async ( { name, departmentId } ) => {
    const pool = await this.db.poolPromise;

    const result = await pool.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'departmentId', this.db.sql.Int, departmentId )
      .query( 'INSERT INTO employees (name, departmentId) OUTPUT inserted.* VALUES (@name, @departmentId)' );

    return result.recordset[0] || null;
  };

  delete = async id => {
    const pool = await this.db.poolPromise;
    await pool.request().input( 'id', this.db.sql.Int, id ).query( 'DELETE FROM employees WHERE id = @id' );
    return { ok: true };
  };

  find = async ( { filters, sort, pagination } ) => {
    const pool = await this.db.poolPromise;
    const request = pool.request();

    let query = `
      SELECT employees.*, departments.name AS departmentName
      FROM employees
      LEFT JOIN departments ON employees.departmentId = departments.id
      WHERE 1=1
    `;

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND employees.name LIKE @name';
    }

    if ( filters.department ) {
      request.input( 'department', this.db.sql.Int, filters.department );
      query += ' AND employees.departmentId = @department';
    }

    const sortMap = {
      id: 'employees.id',
      name: 'employees.name',
      department: 'departments.name'
    };

    const sortField = Object.keys( sort )[0] || 'id';
    const sortOrder = sort[sortField] === -1 ? 'DESC' : 'ASC';
    const orderBy = sortMap[sortField];
    query += ` ORDER BY ${orderBy} ${sortOrder}`;

    if ( pagination.limit > 0 ) {
      request.input( 'offset', this.db.sql.Int, pagination.skip );
      request.input( 'limit', this.db.sql.Int, pagination.limit );
      query += ' OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';
    }

    const result = await request.query( query );

    return result.recordset.map( row => ( {
      id: row.id,
      name: row.name,
      department: {
        id: row.departmentId,
        name: row.departmentName
      }
    } ) );
  };

  findById = async id => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'id', this.db.sql.Int, id ).query( 'SELECT * FROM employees WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findByName = async name => {
    const pool = await this.db.poolPromise;
    const result = await pool.request().input( 'name', this.db.sql.NVarChar, name ).query( 'SELECT * FROM employees WHERE name = @name' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name, departmentId } ) => {
    const pool = await this.db.poolPromise;

    const result = await pool.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'departmentId', this.db.sql.Int, departmentId )
      .query( 'UPDATE employees SET name = @name, departmentId = @departmentId OUTPUT inserted.* WHERE id = @id' );

    return result.recordset[0] || null;
  };

}