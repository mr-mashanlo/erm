import { Unauthorized } from '../errors/unauthorized.js';
import { tokenService, userService } from '../modules/user/index.js';

export const isAuth = async ( req, res, next ) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if ( !accessToken && refreshToken ) {
      const { id, email, role, accessToken: newAccessToken, refreshToken: newRefreshToken } = await userService.refreshToken( refreshToken );
      res.cookie( 'accessToken', newAccessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', newRefreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      const user = { id, email, role };
      req.user = user;
      res.locals.currentUser = user;
      return next();
    }

    const user = tokenService.verifyAccessToken( accessToken );
    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch {
    next( new Unauthorized( [ { name: 'token', message: 'Token not provided' } ] ) );
  }
};