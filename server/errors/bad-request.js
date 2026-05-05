import { CustomError } from './custom-error.js';

export class BadRequest extends CustomError {
  constructor( errors ) {
    super();
    this.status = 400;
    this.message = 'bad request';
    this.errors = errors;
  }
}