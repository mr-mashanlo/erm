import { CustomError } from '../errors/custom-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( error, req, res, next ) => {
  console.log( error );

  if ( error instanceof CustomError ) {
    const { status, message, errors } = error;
    return res.status( status ).format( {
      'application/json': () => res.json( { message, errors } )
      // 'text/html': () => res.render( 'error', { error } )
    } );
  }

  const { message } = error;
  return res.status( 500 ).format( {
    'application/json': () => res.json( { message, errors: [] } )
    // 'text/html': () => res.render( 'error', { error } )
  } );
};