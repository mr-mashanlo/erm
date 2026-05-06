export class UserApiController {

  constructor( userService ) {
    this.userService = userService;
  };

  signIn = async ( req, res, next ) => {
    try {
      const { id, accessToken, refreshToken } = await this.userService.signin( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id } );
    } catch ( error ) {
      next( error );
    }
  };

  signUp = async ( req, res, next ) => {
    try {
      const { id, accessToken, refreshToken } = await this.userService.signup( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id } );
    } catch ( error ) {
      next( error );
    }
  };

};