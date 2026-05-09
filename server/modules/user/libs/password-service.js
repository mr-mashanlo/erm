import bcrypt from 'bcryptjs';

export class PasswordService {

  hash = password => {
    return bcrypt.hashSync( password, 7 );
  };

  compare = ( password, hashPassword ) => {
    return bcrypt.compareSync( password, hashPassword );
  };

}