import { AuthError } from '../errors/auth-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( err, req, res, next ) => {
  console.log( err );
  if ( err instanceof AuthError ) {
    const { status, message, errors } = err;
    return res.status( err.status ).format( {
      html: () => res.render( 'error', { error: { status, message, errors } } ),
      json: () => res.json( { message, errors } ),
      default: () => res.sendStatus( status )
    } );
  } else {
    const { message } = err;
    return res.status( 500 ).format( {
      html: () => res.render( 'error', { error: { status: 500, message, errors: [] } } ),
      json: () => res.json( { message, errors: [] } ),
      default: () => res.sendStatus( 500 )
    } );
  }
};