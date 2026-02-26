export class AssetAssignmentRepository {

  constructor( db ) {
    this.db = db;
  }

  assign = async ( { assetId, employeeId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'assetId', this.db.sql.Int, assetId )
      .input( 'employeeId', this.db.sql.Int, employeeId )
      .input( 'assignedAt', this.db.sql.Int, Date.now() )
      .query( 'INSERT INTO asset_assignments (assetId, employeeId, assignedAt) OUTPUT inserted.* VALUES (@assetId, @employeeId, @assignedAt)' );
    return result.recordset[0] || null;
  };

  delete = async ( id ) => {
    const executor = await this.db.getExecutor();
    await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'DELETE FROM asset_assignments WHERE id = @id' );
    return { ok: true };
  };

  findById = async ( id ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .query( 'SELECT * FROM asset_assignments WHERE id = @id' );
    return result.recordset[0] || null;
  };

  return = async ( id, { assetId } ) => {
    const executor = await this.db.getExecutor();
    const result = await executor.request()
      .input( 'id', this.db.sql.Int, id )
      .input( 'assetId', this.db.sql.Int, assetId )
      .input( 'returnedAt', this.db.sql.Int, Date.now() )
      .query( 'UPDATE asset_assignments SET assetId = @assetId, returnedAt = @returnedAt OUTPUT inserted.* WHERE id = @id' );
    return result.recordset[0] || null;
  };

}