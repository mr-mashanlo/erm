import slug from 'slug';

export class EmployeeRepository {

  constructor( db ) {
    this.db = db;
  }

  assign = async employeeId => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, employeeId )
      .input( 'archived', this.db.sql.Bit, false )
      .query( 'UPDATE employees SET, archived = @archived OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

  archive = async ( id, archive ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'archived', this.db.sql.Bit, archive )
      .query( 'UPDATE employees SET archived = @archived OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

  create = async ( { name, companyId, archived } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'companyId', this.db.sql.Int, companyId )
      .input( 'createdAt', this.db.sql.BigInt, Date.now() )
      .input( 'archived', this.db.sql.Bit, archived )
      .query( 'INSERT INTO employees (name, slug, companyId, createdAt, archived) OUTPUT inserted.* VALUES (@name, @slug, @companyId, @createdAt, @archived)' );
    return result.recordset[0] || null;
  };

  delete = async id => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM employees WHERE id = @id' );
    return { ok: true };
  };

  find = async ( filters, sort, pagination ) => {
    const executor = await this.db.getExecutor();
    const request = await executor.request();
    let query = `
      SELECT employees.*, users.email as email, (
          SELECT asset_employee.id
          FROM asset_employee
          WHERE asset_employee.employeeId = employees.id AND asset_employee.returnedAt IS NULL
          FOR JSON AUTO
        ) as assets
      FROM employees
      LEFT JOIN user_employee ON user_employee.employeeId = employees.id
      LEFT JOIN users ON users.id = user_employee.userId
      WHERE 1 = 1
    `;

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND employees.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND employees.companyId = @companyId';
    }

    if ( filters.archived === true ) {
      request.input( 'archived', this.db.sql.Bit, true );
      query += ' AND employees.archived = @archived';
    }

    if ( filters.archived === false ) {
      request.input( 'archived', this.db.sql.Bit, false );
      query += ' AND employees.archived = @archived';
    }

    query += ` ORDER BY ${sort.sort} ${sort.order}`;
    query += ` OFFSET ${pagination.skip} ROWS FETCH NEXT ${pagination.limit} ROWS ONLY`;

    const result = await request.query( query );
    return result.recordset.map( raw => ( {
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      email: raw.email,
      archived: raw.archived,
      createdAt: raw.createdAt,
      assets: JSON.parse( raw.assets ),
      company: { id: raw.companyId }
    } ) );
  };

  findById = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'SELECT * FROM employees WHERE id = @id' );
    return result.recordset[0] || null;
  };

  findBySlug = async slug => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'slug', this.db.sql.NVarChar, slug )
      .query( 'SELECT * FROM employees WHERE slug = @slug' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .query( 'UPDATE employees SET name = @name, slug = @slug OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}