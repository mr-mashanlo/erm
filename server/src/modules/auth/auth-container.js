import * as db from '../../config/db.js';
import { employeeRepository } from '../employees/employee-container.js';
import { AuthRepository } from './auth-repository.js';
import { AuthService } from './auth-service.js';
import { BcryptHasher } from './bcrypt-hasher.js';
import { TokenService } from './token-service.js';

export const hasher = new BcryptHasher();
export const authRepository = new AuthRepository( db );
export const tokenService = new TokenService();
export const authService = new AuthService( authRepository, employeeRepository, tokenService, hasher );