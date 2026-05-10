import { prisma } from '../../config/db.js';
import { UserApiController } from './api/controller.js';
import { PasswordService } from './libs/password-service.js';
import { TokenService } from './libs/token-service.js';
import { UserRepository } from './repository.js';
import { UserService } from './service.js';
import { UserWebController } from './web/controller.js';

const passwordService = new PasswordService();
export const tokenService = new TokenService();
const userRepository = new UserRepository( prisma );
export const userService = new UserService( userRepository, tokenService, passwordService );
export const userApiController = new UserApiController( userService );
export const userWebController = new UserWebController( userService );