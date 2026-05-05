import { prisma } from '../../config/db.js';
import { UserController } from './controller.js';
import { PasswordService } from './password-service.js';
import { UserRepository } from './repository.js';
import { UserService } from './service.js';
import { TokenService } from './token-service.js';

const passwordService = new PasswordService();
export const tokenService = new TokenService();
const userRepository = new UserRepository( prisma );
export const userService = new UserService( userRepository, tokenService, passwordService );
export const userController = new UserController( userService );