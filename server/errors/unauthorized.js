import { CustomError } from './custom-error.js';

export class Unauthorized extends CustomError {
  constructor( errors ) {
    super();
    this.status = 401;
    this.message = 'unauthorized';
    this.errors = errors;
  }
}