import { Unauthorized } from '../errors/unauthorized.js';
import { tokenService, userService } from '../modules/users/user-container.js';

export const isAuth = async ( req, res, next ) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if ( !accessToken && refreshToken ) {
      const { id, email, company, role, accessToken: newAccessToken, refreshToken: newRefreshToken } = await userService.refreshToken( refreshToken );
      res.cookie( 'accessToken', newAccessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', newRefreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      req.user = { id, email, company, role };
      res.locals.role = role;
      return next();
    }

    req.user = tokenService.verifyAccessToken( accessToken );
    res.locals.role = tokenService.verifyAccessToken( accessToken ).role;
    next();
  } catch {
    next( new Unauthorized( [ { name: 'token', message: 'Token not provided' } ] ) );
  }
};