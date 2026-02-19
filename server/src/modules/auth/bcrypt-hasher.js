import bcrypt from 'bcryptjs';

export class BcryptHasher {

  hash = password => {
    return bcrypt.hashSync( password, 7 );
  };

  compare = ( password, hashPassword ) => {
    return bcrypt.compareSync( password, hashPassword );
  };

}