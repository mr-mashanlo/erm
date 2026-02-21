export class HomeWebController {

  showHome = async ( req, res, next ) => {
    try {
      res.render( 'index', { user: req.user || {} } );
    } catch ( error ) {
      next( error );
    }
  };

};