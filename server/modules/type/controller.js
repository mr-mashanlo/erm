export class TypeController {

  constructor( typeService ) {
    this.typeService = typeService;
  };

  createType = async ( req, res, next ) => {
    try {
      const document = await this.typeService.createType( req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
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

  getTypes = async ( req, res, next ) => {
    try {
      const document = await this.typeService.getTypes();
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getTypeById = async ( req, res, next ) => {
    try {
      const document = await this.typeService.getTypeById( req.params.id );
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

};