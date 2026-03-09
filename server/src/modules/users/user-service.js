import { withTransaction } from '../../config/transaction.js';
import { BadRequest } from '../../errors/bad-request.js';
import { Unauthorized } from '../../errors/unauthorized.js';

export class UserService {

  constructor( userRepository, companyRepository, roleRepository, assetRepository, tokenService, passwordService ) {
    this.userRepository = userRepository;
    this.companyRepository = companyRepository;
    this.roleRepository = roleRepository;
    this.assetRepository = assetRepository;
    this.tokenService = tokenService;
    this.passwordService = passwordService;
  }

  linkUserToEmployee = async ( userId, employeeId ) => {
    return withTransaction( async () => {
      return await this.userRepository.linkUserToEmployee( userId, employeeId );
    } );
  };

  refreshToken = async refreshToken => {
    return withTransaction( async () => {
      const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
      const user = await this.userRepository.findByRefreshToken( hashedRefreshToken );

      if ( +user.expiredAt < Date.now() ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

      const newAccessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, company: user.company.id, role: user.role.name } );
      const newRefreshToken = this.tokenService.generateRefreshToken();
      const newHashedRefreshToken = this.tokenService.hashRefreshToken( newRefreshToken );
      await this.userRepository.updateRefreshToken( user.id, newHashedRefreshToken );

      return { id: user.id, email: user.email, company: user.company.id, role: user.role.name, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } );
  };

  signin = async ( { email, password } ) => {
    return await withTransaction( async () => {
      const user = await this.userRepository.findByEmail( email );
      if ( !user ) throw new BadRequest( [ { name: 'email', message: 'Email is not exist' } ] );

      const isValid = this.passwordService.compare( password, user.password );
      if ( !isValid ) throw new BadRequest( [ { name: 'password', message: 'Incorrect password' } ] );

      const accessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, company: user.company.id, role: user.role.name } );
      const refreshToken = this.tokenService.generateRefreshToken();
      const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
      await this.userRepository.updateRefreshToken( user.id, hashedRefreshToken );

      return { id: user.id, email: user.email, company: user.company.id, role: user.role.name, accessToken, refreshToken };
    } );
  };

  signup = async ( { email, password, companyName } ) => {
    return await withTransaction( async () => {
      const candidate = await this.userRepository.findByEmail( email );
      if ( candidate ) throw new BadRequest( [ { name: 'email', message: 'Email is already exist' } ] );

      const company = await this.companyRepository.create( { name: companyName } );

      const hash = this.passwordService.hash( password );
      const user = await this.userRepository.create( { email, password: hash, companyId: company.id } );

      await this.assetRepository.seedDefaultAssets( company.id );
      const roles = await this.roleRepository.seedDefaultRoles( company.id );
      await this.roleRepository.assignRole( user.id, roles.find( i => i.name === 'admin' ).id );

      const accessToken = this.tokenService.generateAccessToken( { id: user.id, email: user.email, company: company.id, role: 'admin' } );
      const refreshToken = this.tokenService.generateRefreshToken();
      const hashedRefreshToken = this.tokenService.hashRefreshToken( refreshToken );
      await this.userRepository.updateRefreshToken( user.id, hashedRefreshToken );

      return { id: user.id, email: user.email, company: user.companyId, role: 'admin', accessToken, refreshToken };
    } );
  };

}