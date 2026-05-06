export class TypeWebController {

  constructor( typeService ) {
    this.typeService = typeService;
  };

  createType = async ( req, res ) => {
    try {
      await this.typeService.createType( req.body );
      res.redirect( '/types' );
    } catch ( error ) {
      res.render( 'type/types', { types: { data: [], total: 0, limit: 10, page: 1 }, errors: error.errors, body: req.body } );
    }
  };

  deleteType = async ( req, res, next ) => {
    try {
      const document = await this.typeService.deleteType( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  updateType = async ( req, res, next ) => {
    try {
      const document = await this.typeService.updateType( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  showTypesPage = async ( req, res, next ) => {
    try {
      const document = await this.typeService.getTypes( req.query );
      res.render( 'type/types', { types: document, errors: [], body: {} } );
    } catch ( error ) {
      next( error );
    }
  };

  showTypePage = async ( req, res, next ) => {
    try {
      const document = await this.typeService.getTypeById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};