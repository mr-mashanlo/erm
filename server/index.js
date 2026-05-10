import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middlewares/error-handler.js';
import { urlBuilder } from './middlewares/url-builder.js';
import { assetApiRouter } from './modules/asset/api/router.js';
import { assetWebRouter } from './modules/asset/web/router.js';
import { companyApiRouter } from './modules/company/api/router.js';
import { companyWebRouter } from './modules/company/web/router.js';
import { employeeApiRouter } from './modules/employee/api/router.js';
import { employeeWebRouter } from './modules/employee/web/router.js';
import { typeApiRouter } from './modules/type/api/router.js';
import { typeWebRouter } from './modules/type/web/router.js';
import { userApiRouter } from './modules/user/api/router.js';
import { userWebRouter } from './modules/user/web/router.js';

const app = express();
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

app.use( cors( { credentials: true, origin: process.env.FRONT_URL } ) );
app.use( cookieParser() );
app.use( express.json() );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( urlBuilder );

app.use( '/api', userApiRouter );
app.use( '/', userWebRouter );

app.use( '/api', companyApiRouter );
app.use( '/', companyWebRouter );

app.use( '/api', typeApiRouter );
app.use( '/', typeWebRouter );

app.use( '/api', assetApiRouter );
app.use( '/', assetWebRouter );

app.use( '/api', employeeApiRouter );
app.use( '/', employeeWebRouter );

app.use( '/', ( req, res ) => res.redirect( '/companies' ) );

app.use( errorHandler );

app.listen( process.env.APP_PORT, () => {
  console.log( `Server flying at http://localhost:${process.env.APP_PORT}` );
} );