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
import { employeeApiRouter } from './modules/employees/api/employee-router.js';
import { employeeWebRouter } from './modules/employees/web/employee-router.js';
import { homeWebRouter } from './modules/home/web/home-router.js';
import { userApiRouter } from './modules/users/api/user-router.js';
import { userWebRouter } from './modules/users/web/user-router.js';

const app = express();
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

app.use( cors( { credentials: true, origin: process.env.FRONT_URL } ) );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, '../public' ) ) );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( urlBuilder );

app.use( '/', homeWebRouter );

app.use( '/api', userApiRouter );
app.use( '/', userWebRouter );

app.use( '/api', assetApiRouter );
app.use( '/', assetWebRouter );

app.use( '/api', employeeApiRouter );
app.use( '/', employeeWebRouter );

app.use( errorHandler );

app.listen( process.env.APP_PORT, () => {
  console.log( `Server flying at http://localhost:${process.env.APP_PORT}` );
} );