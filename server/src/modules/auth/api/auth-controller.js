export class AuthApiController {

  constructor( authService ) {
    this.authService = authService;
  };

  signin = async ( req, res, next ) => {
    try {
      const { user, accessToken, refreshToken } = await this.authService.signin( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id: user.id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signup = async ( req, res, next ) => {
    try {
      const { user, accessToken, refreshToken } = await this.authService.signup( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { id: user.id, accessToken } );
    } catch ( error ) {
      next( error );
    }
  };

  signout = async ( req, res, next ) => {
    try {
      const { id } = req.user;
      await this.authService.signOut( id );
      res.clearCookie( 'accessToken', { httpOnly: true, sameSite: 'none', secure: true } );
      res.clearCookie( 'refreshToken', { httpOnly: true, sameSite: 'none', secure: true } );
      res.json( { ok: true } );
    } catch ( error ) {
      next( error );
    }
  };

};