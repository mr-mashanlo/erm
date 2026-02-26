import * as db from '../../config/transaction.js';
import { assetTypeRepository } from '../assets/asset-container.js';
import { companyRepository } from '../companies/company-container.js';
import { PasswordService } from './password-service.js';
import { RoleRepository } from './role-repository.js';
import { TokenService } from './token-service.js';
import { UserRepository } from './user-repository.js';
import { UserService } from './user-service.js';

export const passwordService = new PasswordService();
export const tokenService = new TokenService();
export const userRepository = new UserRepository( db );
export const roleRepository = new RoleRepository( db );
export const userService = new UserService( userRepository, companyRepository, roleRepository, assetTypeRepository, tokenService, passwordService );