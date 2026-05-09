export class TypeWebController {

  constructor( typeService, assetService ) {
    this.typeService = typeService;
    this.assetService = assetService;
  };

  createType = async ( req, res, next ) => {
    try {
      await this.typeService.createType( { ...req.body, companyId: req.params.company } );
      res.redirect( req.query.from ? req.query.from : req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteType = async ( req, res, next ) => {
    try {
      await this.typeService.deleteType( { id: req.params.id } );
      res.redirect( '/companies' );
    } catch ( error ) {
      next( error );
    }
  };

  updateType = async ( req, res, next ) => {
    try {
      await this.typeService.updateType( req.params.id, req.body );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showTypesPage = async ( req, res, next ) => {
    try {
      const types = await this.typeService.getTypes( { companyId: req.params.company, ...req.query } );
      res.render( 'type/types', { data: { types } } );
    } catch ( error ) {
      next( error );
    }
  };

  showTypePage = async ( req, res, next ) => {
    try {
      const type = await this.typeService.getTypeById( req.params.id );
      const assets = await this.assetService.getAssets( { typeId: type.id } );
      res.render( 'type/type', { data: { type, assets } } );
    } catch ( error ) {
      next( error );
    }
  };

};