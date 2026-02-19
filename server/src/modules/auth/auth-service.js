import { AuthError } from '../../errors/auth-error.js';

export class AuthService {

  constructor( authRepository, tokenService, hasher ) {
    this.authRepository = authRepository;
    this.tokenService = tokenService;
    this.hasher = hasher;
  };

  signin = async ( { email, password } ) => {
    const user = await this.authRepository.findByEmail( email );
    if ( !user ) throw new AuthError( 400, 'BAD_REQUEST', [ { name: 'email', message: 'Email is not exist' } ] );

    const isValid = this.hasher.compare( password, user.password );
    if ( !isValid ) throw new AuthError( 400, 'BAD_REQUEST', [ { name: 'email', message: 'Incorrect password' } ] );

    const accessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, role: user.role } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.authRepository.updateRefreshToken( user.id, hashedRefreshToken );
    return { user: { id: user.id, email: user.email }, accessToken, refreshToken };
  };

  signup = async ( { email, password } ) => {
    const candidate = await this.authRepository.findByEmail( email );
    if ( candidate ) throw new AuthError( 400, 'BAD_REQUEST', [ { name: 'email', message: 'Email is already exist' } ] );

    const hash = this.hasher.hash( password );
    const user = await this.authRepository.create( { email, password: hash, role: 'user' } );

    const accessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, role: user.role } );
    const refreshToken = this.tokenService.generateRefreshToken();
    const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );

    await this.authRepository.updateRefreshToken( user.id, hashedRefreshToken );
    return { user: { id: user.id, email: user.email }, accessToken, refreshToken };
  };

  signOut = async ( id ) => {
    return await this.authRepository.clearRefreshToken( id );
  };

};