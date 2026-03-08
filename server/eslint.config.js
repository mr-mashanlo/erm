import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default defineConfig( [
  {
    files: [ '**/*.{js}' ],
    ignores: [ 'public/**/*.js' ],
    extends: [ 'js/recommended' ],
    languageOptions: { globals: globals.node },
    plugins: { js, '@simple-sort': simpleImportSort, '@stylistic': stylistic },
    rules: {
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'comma-spacing': 'error',
      'comma-dangle': 'error',
      'indent': [ 'error', 2 ],
      'semi': [ 'error', 'always' ],
      'quotes': [ 'error', 'single' ],
      'object-curly-spacing': [ 'error', 'always' ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'space-in-parens': [ 'error', 'always' ],
      'linebreak-style': [ 'error', 'unix' ],
      'jsx-quotes': [ 'error', 'prefer-double' ],
      '@simple-sort/exports': 'error',
      '@simple-sort/imports': 'error',
      '@stylistic/arrow-parens': [ 'error', 'as-needed' ]
    }
  }
] );
