export class TypeWebController {

  constructor( typeService ) {
    this.typeService = typeService;
  };

  createType = async ( req, res, next ) => {
    try {
      await this.typeService.createType( { ...req.body, userId: req.user.id } );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteType = async ( req, res, next ) => {
    try {
      await this.typeService.deleteType( { id: req.params.id } );
      res.redirect( '/types' );
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
      res.render( 'type/type', { data: { type } } );
    } catch ( error ) {
      next( error );
    }
  };

};