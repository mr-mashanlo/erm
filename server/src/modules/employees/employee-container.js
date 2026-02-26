import * as db from '../../config/transaction.js';
import { EmployeeRepository } from './employee-repository.js';
import { EmployeeService } from './employee-service.js';

export const employeeRepository = new EmployeeRepository( db );
export const employeeService = new EmployeeService( employeeRepository );