export class UserWebController {

  constructor( userService ) {
    this.userService = userService;
  };

  showSignInPage = async ( req, res, next ) => {
    try {
      res.render( 'auth/sign-in', { errors: [], body: { email: 'one@company.com', password: 'one12345' } } );
    } catch ( error ) {
      next( error );
    }
  };

  showSignUpPage = async ( req, res, next ) => {
    try {
      res.render( 'auth/sign-up', { errors: [], body: {} } );
    } catch ( error ) {
      next( error );
    }
  };

  signIn = async ( req, res ) => {
    try {
      const { accessToken, refreshToken } = await this.userService.signin( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.redirect( '/' );
    } catch ( error ) {
      res.render( 'auth/sign-in', { errors: error.errors, body: req.body } );
    }
  };

  signUp = async ( req, res ) => {
    try {
      const { accessToken, refreshToken } = await this.userService.signup( req.body );
      res.cookie( 'accessToken', accessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', refreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.redirect( '/' );
    } catch ( error ) {
      res.render( 'auth/sign-up', { errors: error.errors, body: req.body } );
    }
  };

};