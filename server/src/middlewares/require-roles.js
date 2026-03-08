export const requireRoles = roles => ( req, res, next ) => {
  if ( !req.user ) {
    return res.status( 401 ).json( { message: 'unauthorized', errors: [ { name: 'access', message: 'Access denied' } ] } );
  }

  if ( !roles.includes( req.user.role ) ) {
    return res.status( 403 ).json( { message: 'forbidden', errors: [ { name: 'access', message: 'Access denied' } ] } );
  }

  next();
};