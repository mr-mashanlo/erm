import * as db from '../../config/db.js';
import { departmentRepository } from '../departments/department-container.js';
import { EmployeeRepository } from './employee-repository.js';
import { EmployeeService } from './employee-service.js';

export const employeeRepository = new EmployeeRepository( db );
export const employeeService = new EmployeeService( employeeRepository, departmentRepository );