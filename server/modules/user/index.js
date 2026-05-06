import { prisma } from '../../config/db.js';
import { UserApiController } from './api-controller.js';
import { PasswordService } from './password-service.js';
import { UserRepository } from './repository.js';
import { UserService } from './service.js';
import { TokenService } from './token-service.js';
import { UserWebController } from './web-controller.js';

const passwordService = new PasswordService();
export const tokenService = new TokenService();
const userRepository = new UserRepository( prisma );
export const userService = new UserService( userRepository, tokenService, passwordService );
export const userApiController = new UserApiController( userService );
export const userWebController = new UserWebController( userService );