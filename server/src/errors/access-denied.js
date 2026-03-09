import { CustomError } from './custom-error.js';

export class AccessDenied extends CustomError {
  constructor( errors ) {
    super();
    this.status = 401;
    this.message = 'access denied';
    this.errors = errors;
  }
}