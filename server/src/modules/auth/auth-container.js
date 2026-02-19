import * as db from '../../config/db.js';
import { AuthApiController } from './api/auth-controller.js';
import { AuthRepository } from './auth-repository.js';
import { AuthService } from './auth-service.js';
import { BcryptHasher } from './bcrypt-hasher.js';
import { TokenService } from './token-service.js';
import { AuthWebController } from './web/auth-controller.js';

const hasher = new BcryptHasher();
const authRepository = new AuthRepository( db );
const tokenService = new TokenService();
const authService = new AuthService( authRepository, tokenService, hasher );
export const authApiController = new AuthApiController( authService );
export const authWebController = new AuthWebController( authService );