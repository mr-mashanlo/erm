import { AccessDenied } from '../errors/access-denied.js';

export const requireRoles = roles => ( req, res, next ) => {
  if ( !req.user ) {
    return next( new AccessDenied( [ { name: 'access', message: 'Access denied' } ] ) );
  }

  if ( !roles.includes( req.user.role ) ) {
    return next( new AccessDenied( [ { name: 'access', message: 'Access denied' } ] ) );
  }

  next();
};