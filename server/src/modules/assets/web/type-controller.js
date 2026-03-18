export class TypeWebController {

  constructor( assetTypeService ) {
    this.assetTypeService = assetTypeService;
  };

  createType = async ( req, res, next ) => {
    try {
      await this.assetTypeService.createType( { ...req.body, companyId: req.user.company } );
      res.redirect( req.get( 'Referrer' ) || '/types' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteType = async ( req, res, next ) => {
    try {
      await this.assetTypeService.deleteType( req.params.id );
      res.redirect( req.get( 'Referrer' ) || '/types' );
    } catch ( error ) {
      next( error );
    }
  };

  showTypes = async ( req, res, next ) => {
    try {
      const types = await this.assetTypeService.getTypes( { companyId: req.user.company, ...req.query } );
      res.render( 'types', { types } );
    } catch ( error ) {
      next( error );
    }
  };

  updateType = async ( req, res, next ) => {
    try {
      await this.assetTypeService.updateType( req.params.id, req.body );
      res.redirect( req.get( 'Referrer' ) || '/types' );
    } catch ( error ) {
      next( error );
    }
  };

};