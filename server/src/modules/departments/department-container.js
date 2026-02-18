import * as db from '../../config/db.js';
import { DepartmentApiController } from './api/department-controller.js';
import { DepartmentRepository } from './department-repository.js';
import { DepartmentService } from './department-service.js';
import { DepartmentWebController } from './web/department-controller.js';

const departmentRepository = new DepartmentRepository( db );
const departmentService = new DepartmentService( departmentRepository );
export const departmentApiController = new DepartmentApiController( departmentService );
export const departmentWebController = new DepartmentWebController( departmentService );