import { prisma } from '../../config/db.js';
import { EmployeeApiController } from './api/controller.js';
import { EmployeeRepository } from './repository.js';
import { EmployeeService } from './service.js';
import { EmployeeWebController } from './web/controller.js';

const employeeRepository = new EmployeeRepository( prisma );
export const employeeService = new EmployeeService( employeeRepository );
export const employeeApiController = new EmployeeApiController( employeeService );
export const employeeWebController = new EmployeeWebController( employeeService );