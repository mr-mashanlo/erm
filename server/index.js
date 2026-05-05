import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middlewares/error-handler.js';
import { companyRouter } from './modules/company/router.js';
import { userRouter } from './modules/user/router.js';

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

app.use( '/', userRouter );
app.use( '/', companyRouter );

app.use( errorHandler );

app.listen( process.env.APP_PORT, () => {
  console.log( `Server flying at http://localhost:${process.env.APP_PORT}` );
} );