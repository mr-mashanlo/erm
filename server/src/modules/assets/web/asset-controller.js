export class AssetWebController {

  constructor( assetService, assetTypeService, employeeService ) {
    this.assetService = assetService;
    this.assetTypeService = assetTypeService;
    this.employeeService = employeeService;
  };

  archiveAsset = async ( req, res, next ) => {
    try {
      await this.assetService.archiveAsset( req.params.id, true );
      await this.assetService.returnAsset( req.body.assignId );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  assignAsset = async ( req, res, next ) => {
    try {
      await this.assetService.assignAsset( req.params.id, req.body.assetId );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  createAsset = async ( req, res, next ) => {
    try {
      await this.assetService.createAsset( { ...req.body, companyId: req.user.company, archived: false } );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( req.params.id );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  moveAsset = async ( req, res, next ) => {
    try {
      await this.assetService.moveAsset( req.params.id, req.body.employeeId, req.body.assignId );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  returnAsset = async ( req, res, next ) => {
    try {
      await this.assetService.returnAsset( req.params.id );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  showAssets = async ( req, res, next ) => {
    try {
      const assets = await this.assetService.getAssets( { companyId: req.user.company, archived: false, ...req.query } );
      const types = await this.assetTypeService.getTypes( { companyId: req.user.company, limit: '100' } );
      const employees = await this.employeeService.getEmployees( { companyId: req.user.company, archived: false, limit: '100' } );
      res.render( 'assets', { assets, types, employees } );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      await this.assetService.updateAsset( req.params.id, req.body );
      res.redirect( req.get( 'Referrer' ) || '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

};