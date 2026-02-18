import * as db from '../../config/db.js';
import { AssetRepository } from '../assets/asset-repository.js';
import { AssetService } from '../assets/asset-service.js';
import { DepartmentRepository } from '../departments/department-repository.js';
import { DepartmentService } from '../departments/department-service.js';
import { EmployeeApiController } from './api/employee-controller.js';
import { EmployeeRepository } from './employee-repository.js';
import { EmployeeService } from './employee-service.js';
import { EmployeeWebController } from './web/employee-controller.js';

const assetRepository = new AssetRepository( db );
const employeeRepository = new EmployeeRepository( db );
const departmentRepository = new DepartmentRepository( db );
const assetService = new AssetService( assetRepository );
const departmentService = new DepartmentService( departmentRepository );
const employeeService = new EmployeeService( employeeRepository, departmentRepository );
export const employeeApiController = new EmployeeApiController( employeeService );
export const employeeWebController = new EmployeeWebController( employeeService, departmentService, assetService );