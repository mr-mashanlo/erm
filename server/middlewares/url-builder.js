export const urlBuilder = ( req, res, next ) => {
  res.locals.query = req.query;

  res.locals.buildUrl = params => {
    const currentParams = new URLSearchParams( req.query );

    Object.entries( params ).forEach( ( [ key, value ] ) => {
      if ( value ) {
        currentParams.set( key, value );
      } else {
        currentParams.delete( key );
      }
    } );

    return '?' + currentParams.toString();
  };

  next();
};