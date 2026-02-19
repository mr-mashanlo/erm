export class AuthWebController {

  constructor( authService ) {
    this.authService = authService;
  };

  showSignin = async ( req, res, next ) => {
    try {
      res.render( 'signin' );
    } catch ( error ) {
      next( error );
    }
  };

  showSignup = async ( req, res, next ) => {
    try {
      res.render( 'signup' );
    } catch ( error ) {
      next( error );
    }
  };


  signin = async ( req, res, next ) => {
    try {
      const { accessToken, refreshToken } = await this.authService.signin( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.redirect( '/' );
    } catch ( error ) {
      next( error );
    }
  };

  signup = async ( req, res, next ) => {
    try {
      const { accessToken, refreshToken } = await this.authService.signup( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.redirect( '/' );
    } catch ( error ) {
      next( error );
    }
  };

};