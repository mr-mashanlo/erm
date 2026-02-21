import { assetFormValidator, departamentFormValidator, signinFormValidator, signupFormValidator } from './validator';

window.addEventListener( 'DOMContentLoaded', () => {
  assetFormValidator();
  departamentFormValidator();
  signinFormValidator();
  signupFormValidator();
} );