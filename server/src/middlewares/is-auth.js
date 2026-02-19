export const isAuth = ( tokenService, authRepository ) => async ( req, res, next ) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if ( !accessToken && refreshToken ) {
      const hashedRefreshToken = tokenService.hashRefreshToken( refreshToken );
      const user = await authRepository.findByRefreshToken( hashedRefreshToken );

      if ( +user.expiredAt < Date.now() ) return res.status( 500 ).json( { message: 'TOKEN', errors: [ { name: 'token', message: 'Token has expired' } ] } );;

      const newAccessToken = tokenService.generateAccessToken( { id: user.id, email: user.email } );
      const newRefreshToken = tokenService.generateRefreshToken();
      const newHashedRefreshToken = tokenService.hashRefreshToken( newRefreshToken );

      await authRepository.updateRefreshToken( user.id, newHashedRefreshToken );

      res.cookie( 'accessToken', newAccessToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );
      res.cookie( 'refreshToken', newHashedRefreshToken, { maxAge: process.env.COOKIE_ACCESS_TIME, httpOnly: true, sameSite: 'none', secure: true } );

      req.user = { id: user.id, email: user.email, role: user.role };

      return next();
    }

    req.user = tokenService.verifyAccessToken( accessToken );

    next();
  } catch {
    return res.status( 500 ).json( { message: 'TOKEN', errors: [ { name: 'token', message: 'Token not provided' } ] } );
  }
};