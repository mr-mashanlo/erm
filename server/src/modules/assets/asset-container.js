import * as db from '../../config/db.js';
import { DepartmentRepository } from '../departments/department-repository.js';
import { EmployeeRepository } from '../employees/employee-repository.js';
import { EmployeeService } from '../employees/employee-service.js';
import { AssetApiController } from './api/asset-controller.js';
import { AssetRepository } from './asset-repository.js';
import { AssetService } from './asset-service.js';
import { AssetWebController } from './web/asset-controller.js';

const assetRepository = new AssetRepository( db );
const departmentRepository = new DepartmentRepository( db );
const employeeRepository = new EmployeeRepository( db );
const assetService = new AssetService( assetRepository );
const employeeService = new EmployeeService( employeeRepository, departmentRepository );
export const assetApiController = new AssetApiController( assetService );
export const assetWebController = new AssetWebController( assetService, employeeService );