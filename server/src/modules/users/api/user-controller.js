export class UserApiController {

  constructor( userService ) {
    this.userService = userService;
  };

  signin = async ( req, res, next ) => {
    try {
      const { id, accessToken, refreshToken } = await this.userService.signin( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signup = async ( req, res, next ) => {
    try {
      const { id, accessToken, refreshToken } = await this.userService.signup( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signout = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      await this.userService.signOut( id );
      res.clearCookie( 'accessToken', { httpOnly: true, sameSite: 'none', secure: true } );
      res.clearCookie( 'refreshToken', { httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

};