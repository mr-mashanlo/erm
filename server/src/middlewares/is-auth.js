import { tokenService } from '../modules/auth/auth-container.js';
import { authRepository } from '../modules/auth/auth-container.js';

export const isAuth = async ( req, res, next ) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if ( !accessToken && refreshToken ) {
      const hashedRefreshToken = tokenService.hashRefreshToken( refreshToken );
      const user = await authRepository.findByRefreshToken( hashedRefreshToken );

      if ( +user.expiredAt < Date.now() ) return res.status( 401 ).format( {
        html: () => res.redirect( '/auth/signin' ),
        json: () => res.json( { message: 'unauthorized', errors: [ { name: 'token', message: 'Token has expired' } ] } ),
        default: () => res.sendStatus( 401 )
      } );

      const newAccessToken = tokenService.generateAccessToken( { id: user.id, email: user.email, role: user.role } );
      const newRefreshToken = tokenService.generateRefreshToken();
      const newHashedRefreshToken = tokenService.hashRefreshToken( newRefreshToken );

      await authRepository.updateRefreshToken( user.id, newHashedRefreshToken );

      res.cookie( 'accessToken', newAccessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', newRefreshToken, { maxAge: process.env.COOKIE_REFRESH_TIME, httpOnly: true, sameSite: 'none', secure: true } );

      req.user = { id: user.id, email: user.email, role: user.role };

      return next();
    }

    req.user = tokenService.verifyAccessToken( accessToken );

    next();
  } catch {
    return res.status( 401 ).format( {
      html: () => res.redirect( '/auth/signin' ),
      json: () => res.json( { message: 'unauthorized', errors: [ { name: 'token', message: 'Token not provided' } ] } ),
      default: () => res.sendStatus( 401 )
    } );
  }
};