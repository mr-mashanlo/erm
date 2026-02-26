export class UserWebController {

  constructor( authService ) {
    this.authService = authService;
  };

  showSignin = async ( req, res, next ) => {
    try {
      res.render( 'signin', { user: { email: 'olivia@company.com', password: 'Password12345%' }, errors: [] } );
    } catch ( error ) {
      next( error );
    }
  };

  showSignup = async ( req, res, next ) => {
    try {
      res.render( 'signup', { user: { email: 'emily@company.com', password: 'Password12345%' }, errors: [] } );
    } catch ( error ) {
      next( error );
    }
  };

  signin = async ( req, res ) => {
    try {
      const { accessToken, refreshToken } = await this.authService.signin( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.redirect( '/' );
    } catch ( error ) {
      res.render( 'signin', { user: req.body, errors: error.errors } );
    }
  };

  signup = async ( req, res ) => {
    try {
      const { accessToken, refreshToken } = await this.authService.signup( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.redirect( '/' );
    } catch ( error ) {
      console.log( error );

      res.render( 'signup', { user: req.body, errors: error.errors } );
    }
  };

};