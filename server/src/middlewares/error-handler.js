import { AuthError } from '../errors/auth-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( err, req, res, next ) => {
  console.log( err );
  if ( err instanceof AuthError ) {
    const { status, message, errors } = err;
    return res.status( err.status ).json( { status, message, errors } );
  } else {
    const { message } = err;
    return res.status( 500 ).json( { errors: [ { name: 'error', message } ] } );
  }
};