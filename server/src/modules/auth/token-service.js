import crypto from 'node:crypto';

import jwt from 'jsonwebtoken';

export class TokenService {

  generateAccessToken = payload => {
    return jwt.sign( payload, process.env.ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_TIME } );
  };

  verifyAccessToken = token => {
    return jwt.verify( token, process.env.ACCESS_KEY );
  };

  generateRefreshToken = () => {
    return crypto.randomBytes( 64 ).toString( 'hex' );
  };

  hashRefreshToken = token => {
    return crypto.createHmac( 'sha256', process.env.REFRESH_KEY ).update( token ).digest( 'hex' );
  };

}