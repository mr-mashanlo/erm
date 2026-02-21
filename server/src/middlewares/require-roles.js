export const requireRoles = ( roles ) => ( req, res, next ) => {
  if ( !req.user ) {
    return res.status( 401 ).format( {
      html: () => res.render( 'access-denied' ),
      json: () => res.json( { message: 'unauthorized', errors: [ { name: 'access', message: 'Access denied' } ] } ),
      default: () => res.sendStatus( 401 )
    } );
  }

  if ( !roles.includes( req.user.role ) ) {
    return res.status( 403 ).format( {
      html: () => res.render( 'access-denied' ),
      json: () => res.json( { message: 'forbidden', errors: [ { name: 'access', message: 'Access denied' } ] } ),
      default: () => res.sendStatus( 403 )
    } );
  }

  next();
};