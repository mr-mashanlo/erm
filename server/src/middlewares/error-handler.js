import { AuthError } from '../errors/auth-error.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = ( err, req, res, next ) => {
  if ( err instanceof AuthError ) {
    return res.status( err.status ).json( { status: err.status, message: err.message, errors: err.errors } );
  };
  console.log( err );
  return res.status( 500 ).json( { errors: [ { name: 'error', message: 'Something went wrong' } ] } );
};