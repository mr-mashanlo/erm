import { PaginationQuerySchema, SortingQuerySchema } from '../../../schemas/filter-query-schema.js';
import { AssetQuerySchema, FilteringQuerySchema } from '../asset-schema.js';

export class AssetWebController {

  constructor( assetService, employeeService ) {
    this.assetService = assetService;
    this.employeeService = employeeService;
  };

  createAsset = async ( req, res, next ) => {
    try {
      const body = AssetQuerySchema.parse( req.body );
      await this.assetService.createAsset( { ...body, companyId: req.user.company } );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  deleteAsset = async ( req, res, next ) => {
    try {
      await this.assetService.deleteAsset( req.params.id );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  showAssets = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const assets = await this.assetService.getAssets( { ...filters, companyId: req.user.company }, sort, pagination );
      const types = await this.assetService.getTypes( { companyId: req.user.company } );
      res.render( 'assets', { assets, types } );
    } catch ( error ) {
      next( error );
    }
  };

  updateAsset = async ( req, res, next ) => {
    try {
      const body = AssetQuerySchema.parse( req.body );
      await this.assetService.updateAsset( req.params.id, body );
      res.redirect( '/assets' );
    } catch ( error ) {
      next( error );
    }
  };

  createEmployeeAsset = async ( req, res, next ) => {
    try {
      const body = AssetQuerySchema.parse( req.body );
      const asset = await this.assetService.createAsset( { ...body, companyId: req.user.company } );
      const employee = await this.employeeService.getEmployeeBySlug( req.params.ename );
      await this.assetService.assignAssetToEmployee( asset.id, employee.id );
      res.redirect( `/departments/${req.params.dname}/${req.params.ename}/` );
    } catch ( error ) {
      next( error );
    }
  };

  returnEmployeeAsset = async ( req, res, next ) => {
    try {
      await this.assetService.returnAssetFromEmployee( req.params.id );
      res.redirect( `/departments/${req.params.dname}/${req.params.ename}/` );
    } catch ( error ) {
      next( error );
    }
  };

  showEmployeeAssets = async ( req, res, next ) => {
    try {
      const filters = FilteringQuerySchema.parse( req.query );
      const sort = SortingQuerySchema.parse( req.query );
      const pagination = PaginationQuerySchema.parse( req.query );
      const employee = await this.employeeService.getEmployeeBySlug( req.params.ename );
      const assets = await this.assetService.getAssets( { ...filters, employeeId: employee.id, returnedAt: null }, sort, pagination );
      const types = await this.assetService.getTypes( { companyId: req.user.company } );
      res.render( 'assets', { assets, types } );
    } catch ( error ) {
      next( error );
    }
  };

  updateEmployeeAsset = async ( req, res, next ) => {
    try {
      const body = AssetQuerySchema.parse( req.body );
      await this.assetService.updateAsset( req.params.id, body );
      res.redirect( `/departments/${req.params.dname}/${req.params.ename}/` );
    } catch ( error ) {
      next( error );
    }
  };

};