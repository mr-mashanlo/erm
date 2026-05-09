import { Forbidden } from '../errors/forbidden.js';

export const checkRoles = roles => ( req, res, next ) => {
  try {
    const { role } = req.user;

    if ( !roles.includes( role ) ) {
      return next( new Forbidden( [ { name: 'permission', message: 'Permission denied' } ] ) );
    }

    next();
  } catch {
    next( new Forbidden( [ { name: 'permission', message: 'Permission error' } ] ) );
  }
};