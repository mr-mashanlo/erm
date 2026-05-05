import { CustomError } from './custom-error.js';

export class Forbidden extends CustomError {
  constructor( errors ) {
    super();
    this.status = 403;
    this.message = 'forbidden';
    this.errors = errors;
  }
}