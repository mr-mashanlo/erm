import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middlewares/error-handler.js';
import { urlBuilder } from './middlewares/url-builder.js';
import { assetApiRouter } from './modules/assets/api/asset-router.js';
import { assetWebRouter } from './modules/assets/web/asset-router.js';
import { departmentApiRouter } from './modules/departments/api/department-router.js';
import { departmentWebRouter } from './modules/departments/web/department-router.js';
import { employeeApiRouter } from './modules/employees/api/employee-router.js';
import { employeeWebRouter } from './modules/employees/web/employee-router.js';

const app = express();
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

app.use( cors( { credentials: true } ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, '../public' ) ) );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( urlBuilder );

app.get( '/', ( req, res ) => res.render( 'index' ) );

app.use( '/api/employees', employeeApiRouter );
app.use( '/employees', employeeWebRouter );

app.use( '/api/departments', departmentApiRouter );
app.use( '/departments', departmentWebRouter );

app.use( '/api/assets', assetApiRouter );
app.use( '/assets', assetWebRouter );

app.use( errorHandler );

app.listen( process.env.APP_PORT, () => {
  console.log( `Server flying at http://localhost:${process.env.APP_PORT}` );
} );