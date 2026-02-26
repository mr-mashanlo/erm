import slug from 'slug';

export class AssetRepository {

  constructor( db ) {
    this.db = db;
  }

  count = async ( filters ) => {
    const executor = await this.db.getExecutor();
    const request = executor.request();
    let query = `
      SELECT assets.*
      FROM assets
      LEFT JOIN asset_employee ON assets.id = asset_employee.assetId
      WHERE 1 = 1
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

    if ( filters.returnedAt || filters.returnedAt === null ) {
      request.input( 'returnedAt', this.db.sql.BigInt, filters.returnedAt );
      query += ' AND asset_employee.returnedAt = @returnedAt';
    }

    const result = await request.query( query );
    return result.recordset.length;
  };

  create = async ( { name, serialNumber, companyId, typeId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'name', this.db.sql.NVarChar, name )
      .input( 'slug', this.db.sql.NVarChar, slug( name ) )
      .input( 'serialNumber', this.db.sql.NVarChar, serialNumber )
      .input( 'typeId', this.db.sql.Int, typeId )
      .input( 'companyId', this.db.sql.Int, companyId )
      .query( 'INSERT INTO assets (name, slug, serialNumber, typeId, companyId) OUTPUT inserted.* VALUES (@name, @slug, @serialNumber, @typeId, @companyId)' );
    return result.recordset[0] || null;
  };

  delete = async ( id ) => {
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
      SELECT assets.id as id, assets.name as name, assets.serialNumber as serialNumber, asset_employee.id as assignId, asset_types.name as type
      FROM assets
      LEFT JOIN asset_employee ON assets.id = asset_employee.assetId
      LEFT JOIN asset_types ON assets.typeId = asset_types.id
      WHERE 1 = 1
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

    if ( filters.returnedAt || filters.returnedAt === null ) {
      request.input( 'returnedAt', this.db.sql.BigInt, filters.returnedAt );
      query += ' AND asset_employee.returnedAt = @returnedAt';
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
      .query( 'SELECT * FROM assets WHERE id = @id' );
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

  assign = async ( assetId, employeeId ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'assetId', this.db.sql.Int, assetId )
      .input( 'employeeId', this.db.sql.Int, employeeId )
      .input( 'assignedAt', this.db.sql.BigInt, Date.now() )
      .query( 'INSERT INTO asset_employee (assetId, employeeId, assignedAt) OUTPUT inserted.* VALUES (@assetId, @employeeId, @assignedAt)' );
    return result.recordset[0] || null;
  };

  return = async ( id ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'returnedAt', this.db.sql.BigInt, Date.now() )
      .query( 'UPDATE asset_employee SET returnedAt = @returnedAt OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}