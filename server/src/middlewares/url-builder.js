export const urlBuilder = ( req, res, next ) => {
  res.locals.query = req.query;

  res.locals.buildUrl = params => {
    const currentParams = new URLSearchParams( req.query );

    for ( const key in params ) {
      const value = params[key];
      if ( value ) {
        currentParams.set( key, value );
        return '?' + currentParams.toString();
      } else {
        currentParams.delete( key );
        return '?' + currentParams.toString();
      }
    }
  };

  next();
};