export const validate = schema => ( req, res, next ) => {
  try {
    req.body = schema.parse( req.body );
    next();
  } catch ( error ) {
    const errorObject = JSON.parse( error )[0];
    return res.status( 400 ).json( [ { name: errorObject.path[0], message: errorObject.message } ] );
  }
};