import slug from 'slug';

export class AssetRepository {

  constructor( db ) {
    this.db = db;
  }

  archive = async ( id, archive ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'archived', this.db.sql.Bit, archive )
      .query( 'UPDATE assets SET archived = @archived OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

  assign = async ( employeeId, assetId ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'assetId', this.db.sql.Int, assetId )
      .input( 'employeeId', this.db.sql.Int, employeeId )
      .input( 'assignedAt', this.db.sql.BigInt, Date.now() )
      .input( 'archived', this.db.sql.Bit, false )
      .query( 'INSERT INTO asset_employee (assetId, employeeId, assignedAt, archived) OUTPUT inserted.* VALUES (@assetId, @employeeId, @assignedAt, @archived)' );
    return result.recordset[0] || null;
  };

  create = async ( { name, serialNumber, companyId, typeId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'serialNumber', this.db.sql.NVarChar, serialNumber )
      .input( 'typeId', this.db.sql.Int, typeId )
      .input( 'companyId', this.db.sql.Int, companyId )
      .input( 'archived', this.db.sql.Bit, false )
      .query( 'INSERT INTO assets (name, slug, serialNumber, typeId, companyId, archived) OUTPUT inserted.* VALUES (@name, @slug, @serialNumber, @typeId, @companyId, @archived)' );
    return result.recordset[0] || null;
  };

  delete = async id => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM assets WHERE id = @id' );
    return { ok: true };
  };

  find = async ( filters, sort, pagination ) => {
    const executor = await this.db.getExecutor();
    const request = await executor.request();
    let query = `
      SELECT assets.id as id, assets.name as name, assets.serialNumber as serialNumber, asset_employee.id as assignId, asset_employee.assignedAt as assignedAt, asset_types.name as type, employees.name as employee
      FROM assets
      LEFT JOIN asset_employee ON assets.id = asset_employee.assetId AND asset_employee.returnedAt IS NULL AND asset_employee.assignedAt IS NOT NULL
      LEFT JOIN asset_types ON assets.typeId = asset_types.id
      LEFT JOIN employees ON employees.id = asset_employee.employeeId
      WHERE 1=1
    `;

    if ( filters.search ) {
      request.input( 'name', this.db.sql.NVarChar, `%${filters.search}%` );
      query += ' AND assets.name LIKE @name';
    }

    if ( filters.companyId ) {
      request.input( 'companyId', this.db.sql.Int, filters.companyId );
      query += ' AND assets.companyId = @companyId';
    }

    if ( filters.employeeId ) {
      request.input( 'employeeId', this.db.sql.Int, filters.employeeId );
      query += ' AND asset_employee.employeeId = @employeeId';
    }

    if ( filters.archived ) {
      request.input( 'archived', this.db.sql.Bit, true );
      query += ' AND assets.archived = @archived';
    } else {
      request.input( 'archived', this.db.sql.Bit, false );
      query += ' AND assets.archived = @archived';
    }

    if ( filters.orphaned ) {
      query += ' AND asset_employee.assetId IS NULL';
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
      .query( 'SELECT * FROM assets WHERE id = @id' );
    return result.recordset[0] || null;
  };

  return = async id => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'returnedAt', this.db.sql.BigInt, Date.now() )
      .input( 'archived', this.db.sql.Bit, true )
      .query( 'UPDATE asset_employee SET returnedAt = @returnedAt, archived = @archived OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

  update = async ( id, { name, serialNumber, typeId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'serialNumber', this.db.sql.NVarChar, serialNumber )
      .input( 'typeId', this.db.sql.Int, typeId )
      .query( 'UPDATE assets SET name = @name, slug = @slug, serialNumber = @serialNumber, typeId = @typeId OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}