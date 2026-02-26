export class HomeWebController {

  showHome = async ( req, res, next ) => {
    try {
      res.render( 'index' );
    } catch ( error ) {
      next( error );
    }
  };

};