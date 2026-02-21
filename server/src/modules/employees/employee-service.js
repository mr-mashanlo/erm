export class EmployeeService {

  constructor( employeeRepository, departmentRepository ) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
  };

  createEmployee = async employee => {
    return await this.employeeRepository.create( employee );
  };

  deleteEmployee = async id => {
    return await this.employeeRepository.delete( id );
  };

  getAllEmployees = async query => {
    const filters = {};
    const sort = {};
    const pagination = {};

    if ( query.search ) {
      filters.search = query.search;
    }

    if ( query.department ) {
      const department = await this.departmentRepository.findByName( query.department );
      filters.department = department.id;
    }

    const allowedSortFields = [ 'name', 'department' ];
    const sortField = allowedSortFields.includes( query.sort ) ? query.sort : 'id';
    sort[sortField] = query.order === 'desc' ? -1 : 1;

    const page = Number( query.page ) || 1;
    pagination.limit = Math.min( Number( query.limit || 10 ), 100 );
    pagination.skip = ( page - 1 ) * pagination.limit;

    const employees = await this.employeeRepository.find( { filters, sort, pagination } );
    const total = await this.employeeRepository.count( { filters } );

    return { data: employees, total, page, limit: pagination.limit };
  };

  getEmployeeById = async id => {
    return await this.employeeRepository.findById( id );
  };

  getEmployeeByUserId = async id => {
    return await this.employeeRepository.findByUserId( id );
  };

  updateEmployee = async ( id, employee ) => {
    return await this.employeeRepository.update( id, employee );
  };

};