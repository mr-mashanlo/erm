import { BadRequest } from '../../errors/bad-request.js';
import { Unauthorized } from '../../errors/unauthorized.js';

export class UserService {

  constructor( userRepository, tokenService, passwordService ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.passwordService = passwordService;
  }

  refreshToken = async refreshToken => {
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
    const user = await this.userRepository.findByToken( hashedRefreshToken );

    if ( !user ) throw new Unauthorized( [ { name: 'token', message: 'Invalid or reused token' } ] );
    if ( Number( user.expiredAt ) < Date.now() ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

    const newAccessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, role: user.role } );
    const newRefreshToken = this.tokenService.generateRefreshToken();
    const newHashedRefreshToken = this.tokenService.hashRefreshToken( newRefreshToken );
    const updatedUser = await this.userRepository.update( { id: user.id, refreshToken: hashedRefreshToken }, { refreshToken: newHashedRefreshToken, expiredAt: Date.now() + +process.env.COOKIE_REFRESH_TIME } );

    if ( !updatedUser ) throw new Unauthorized( [ { message: 'Token already rotated' } ] );
    return { id: user.id, email: user.email, role: user.role, accessToken: newAccessToken, refreshToken: newRefreshToken };
  };

  signin = async ( { email, password } ) => {
    const user = await this.userRepository.findByEmail( email );
    if ( !user ) throw new BadRequest( [ { name: 'email', message: 'Email is not exist' } ] );

    const isValid = this.passwordService.compare( password, user.password );
    if ( !isValid ) throw new BadRequest( [ { name: 'password', message: 'Incorrect password' } ] );

    const accessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, role: user.role } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
    await this.userRepository.update( { id: user.id }, { refreshToken: hashedRefreshToken, expiredAt: Date.now() + +process.env.COOKIE_REFRESH_TIME } );

    return { id: user.id, email: user.email, role: user.role, accessToken, refreshToken };
  };

  signup = async ( { email, password } ) => {
    const candidate = await this.userRepository.findByEmail( email );
    if ( candidate ) throw new BadRequest( [ { name: 'email', message: 'Email is already exist' } ] );

    const hash = this.passwordService.hash( password );
    const user = await this.userRepository.create( { email, password: hash } );

    const accessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, role: user.role } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
    await this.userRepository.update( { id: user.id }, { refreshToken: hashedRefreshToken, expiredAt: Date.now() + +process.env.COOKIE_REFRESH_TIME } );

    return { id: user.id, email: user.email, role: user.role, accessToken, refreshToken };
  };

}