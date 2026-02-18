import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import browserSyncPkg from 'browser-sync';
import gulp from 'gulp';
import dartSass from 'gulp-dart-sass';
import plumber from 'gulp-plumber';
import gulpPostcss from 'gulp-postcss';
import rollupPostcss from 'rollup-plugin-postcss';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';

const { src, dest, watch, series, parallel } = gulp;
const browserSync = browserSyncPkg.create();

const paths = {
  html: {
    src: 'app/*.html'
  },
  styles: {
    src: 'app/src/sass/**/*.sass',
    dest: 'app/dist/css/'
  },
  scripts: {
    src: 'app/src/js/',
    dest: 'app/dist/js/'
  }
};

function html() {
  return src( paths.html.src )
    .pipe( browserSync.stream() );
}

function styles() {
  return src( paths.styles.src )
    .pipe( plumber() )
    .pipe( dartSass.sync( { silenceDeprecations: [ 'if-function', 'legacy-js-api' ] } ) )
    .pipe( gulpPostcss() )
    .pipe( dest( paths.styles.dest ) )
    .pipe( browserSync.stream() );
}

async function scripts() {
  const bundle = await rollup( {
    input: {
      main: paths.scripts.src + 'main.js'
    },
    plugins: [
      resolve(),
      rollupPostcss(),
      esbuild( { minify: true, legalComments: 'none', target: 'es2018', jsx: 'automatic' } ),
      commonjs(),
      replace( { 'process.env.NODE_ENV': JSON.stringify( 'production' ), preventAssignment: true } )
    ]
  } );

  await bundle.write( {
    dir: paths.scripts.dest,
    entryFileNames: '[name].js'
  } );

  return src( paths.scripts.src )
    .pipe( browserSync.stream() );
}

function serve() {
  browserSync.init( {
    server: { baseDir: 'app' },
    port: 4000,
    notify: false,
    open: false,
    ghostMode: false,
    ui: false
  } );

  watch( paths.html.src, parallel( html, styles ) );
  watch( paths.styles.src, styles );
  watch( paths.scripts.src, scripts );
}

function copyCSS() {
  return src( 'app/dist/css/*.css' )
    .pipe( dest( '../server/public/css/' ) );
}

function copyJS() {
  return src( 'app/dist/js/*.js' )
    .pipe( dest( '../server/public/js/' ) );
}

export const dev = series( parallel( styles, scripts ), serve );
export const build = series( parallel( styles, scripts ), copyCSS, copyJS );
