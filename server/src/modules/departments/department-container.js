import * as db from '../../config/db.js';
import { DepartmentRepository } from './department-repository.js';
import { DepartmentService } from './department-service.js';

export const departmentRepository = new DepartmentRepository( db );
export const departmentService = new DepartmentService( departmentRepository );