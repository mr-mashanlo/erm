export class CompanyWebController {

  constructor( companyService ) {
    this.companyService = companyService;
  };

  createCompany = async ( req, res ) => {
    try {
      await this.companyService.createCompany( { ...req.body, userId: req.user.id } );
      res.redirect( '/companies' );
    } catch ( error ) {
      res.render( 'company/companies', { companies: { data: [], total: 0, limit: 10, page: 1 }, errors: error.errors, body: req.body } );
    }
  };

  deleteCompany = async ( req, res, next ) => {
    try {
      const document = await this.companyService.deleteCompany( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  updateCompany = async ( req, res, next ) => {
    try {
      const document = await this.companyService.updateCompany( req.params.id, req.body );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  showCompaniesPage = async ( req, res, next ) => {
    try {
      const document = await this.companyService.getCompanies( req.query );
      res.render( 'company/companies', { companies: document, errors: [], body: {} } );
    } catch ( error ) {
      next( error );
    }
  };

  showCompanyPage = async ( req, res, next ) => {
    try {
      const document = await this.companyService.getCompanyById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

};