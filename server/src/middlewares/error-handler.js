import { CustomError } from '../errors/custom-error.js';
import { Unauthorized } from '../errors/unauthorized.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( error, req, res, next ) => {
  console.log( error );
  if ( error instanceof Unauthorized ) {
    const { status, message, errors } = error;
    return res.status( status ).format( {
      'application/json': () => res.json( { message, errors } ),
      'text/html': () => res.redirect( '/auth/signin' )
    } );
  } else if ( error instanceof CustomError ) {
    const { status, message, errors } = error;
    return res.status( status ).format( {
      'application/json': () => res.json( { message, errors } ),
      'text/html': () => res.render( 'error', { error } )
    } );
  } else {
    const { message } = error;
    return res.status( 500 ).format( {
      'application/json': () => res.json( { message, errors: [] } ),
      'text/html': () => res.render( 'error', { error } )
    } );
  }
};