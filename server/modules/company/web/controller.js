export class CompanyWebController {

  constructor( companyService, typeService, assetService ) {
    this.companyService = companyService;
    this.typeService = typeService;
    this.assetService = assetService;
  };

  createCompany = async ( req, res, next ) => {
    try {
      await this.companyService.createCompany( { ...req.body, userId: req.user.id } );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  deleteCompany = async ( req, res, next ) => {
    try {
      await this.companyService.deleteCompany( { id: req.params.id } );
      res.redirect( '/companies' );
    } catch ( error ) {
      next( error );
    }
  };

  updateCompany = async ( req, res, next ) => {
    try {
      await this.companyService.updateCompany( req.params.id, req.body );
      res.redirect( req.path );
    } catch ( error ) {
      next( error );
    }
  };

  showCompaniesPage = async ( req, res, next ) => {
    try {
      const companies = await this.companyService.getCompanies( req.query );
      res.render( 'company/companies', { data: { companies } } );
    } catch ( error ) {
      next( error );
    }
  };

  showCompanyPage = async ( req, res, next ) => {
    try {
      const company = await this.companyService.getCompanyById( req.params.id );
      const types = await this.typeService.getTypes( { companyId: company.id } );
      const assets = await this.assetService.getAssets( { companyId: company.id } );
      res.render( 'company/company', { data: { company, types, assets } } );
    } catch ( error ) {
      next( error );
    }
  };

};