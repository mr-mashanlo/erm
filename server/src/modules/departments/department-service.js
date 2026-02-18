export class DepartmentService {

  constructor( departmentRepository ) {
    this.departmentRepository = departmentRepository;
  };

  createDepartment = async department => {
    return await this.departmentRepository.create( department );
  };

  deleteDepartment = async id => {
    return await this.departmentRepository.delete( id );
  };

  getAllDepartments = async query => {
    const filters = {};
    const sort = {};
    const pagination = {};

    if ( query.search ) {
      filters.search = query.search;
    }

    if ( query.address ) {
      filters.address = query.address;
    }

    const allowedSortFields = [ 'name', 'address' ];
    const sortField = allowedSortFields.includes( query.sort ) ? query.sort : 'id';
    sort[sortField] = query.order === 'desc' ? -1 : 1;

    const page = Number( query.page ) || 1;
    pagination.limit = Math.min( Number( query.limit || 10 ), 100 );
    pagination.skip = ( page - 1 ) * pagination.limit;

    const department = await this.departmentRepository.find( { filters, sort, pagination } );
    const total = await this.departmentRepository.count( { filters } );

    return { data: department, total, page, limit: pagination.limit };
  };

  getDepartmentById = async id => {
    return await this.departmentRepository.findById( id );
  };

  updateDepartment = async ( id, department ) => {
    return await this.departmentRepository.update( id, department );
  };

};