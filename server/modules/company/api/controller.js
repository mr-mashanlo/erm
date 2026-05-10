export class CompanyApiController {

  constructor( companyService ) {
    this.companyService = companyService;
  };

  createCompany = async ( req, res, next ) => {
    try {
      const document = await this.companyService.createCompany( { ...req.body, userId: req.user.id } );
      res.json( document );
    } catch ( error ) {
      next( error );
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

  getCompanies = async ( req, res, next ) => {
    try {
      const document = await this.companyService.getCompanies( req.query );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getCompanyById = async ( req, res, next ) => {
    try {
      const document = await this.companyService.getCompanyById( req.params.id );
      res.json( document );
    } catch ( error ) {
      next( error );
    }
  };

  getCompanyBySlug = async ( req, res, next ) => {
    try {
      const document = await this.companyService.getCompanyBySlug( { slug: req.params.slug, userId: req.user.id } );
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

};