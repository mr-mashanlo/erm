import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig( [
  {
    files: [ '**/*.{js,jsx}' ],
    plugins: { js },
    extends: [ js.configs.recommended, pluginReact.configs.flat.recommended ],
    languageOptions: { globals: globals.browser },
    ignores: [ 'app/dist/js/**/*.js' ],
    rules: {
      'react/react-in-jsx-scope': 'off',
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
      'jsx-quotes': [ 'error', 'prefer-double' ]
    }
  }
] );
