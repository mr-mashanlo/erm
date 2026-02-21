import JustValidate from 'just-validate';

export const signinFormValidator = () => {

  const form = document.querySelector( '#signin-form' );

  if ( !form ) return;

  const validator = new JustValidate( '#signin-form', {
    errorLabelStyle: null,
    errorLabelCssClass: [ 'field-error' ],
    errorFieldCssClass: [ 'invalid' ],
    successFieldCssClass: [ 'valid' ]
  } );

  validator
    .addField( '#email', [
      { rule: 'required' },
      { rule: 'email' }
    ] )
    .addField( '#password', [
      { rule: 'required' },
      {
        rule: 'strongPassword',
        errorMessage: 'Min 8 chars including upper, lower, digit, symbol (!@$%&*)'
      }
    ] )
    .onSuccess( e => e.currentTarget.submit() );
};

export const signupFormValidator = () => {

  const form = document.querySelector( '#signup-form' );

  if ( !form ) return;

  const validator = new JustValidate( '#signup-form', {
    errorLabelStyle: null,
    errorLabelCssClass: [ 'field-error' ],
    errorFieldCssClass: [ 'invalid' ],
    successFieldCssClass: [ 'valid' ]
  } );

  validator
    .addField( '#name', [
      { rule: 'required' },
      { rule: 'minLength', value: 2 }
    ] )
    .addField( '#departmentId', [
      { rule: 'required' }
    ] )
    .addField( '#email', [
      { rule: 'required' },
      { rule: 'email' }
    ] )
    .addField( '#password', [
      { rule: 'required' },
      { rule: 'strongPassword', errorMessage: 'Min 8 chars including upper, lower, digit, symbol (!@$%&*)' }
    ] )
    .onSuccess( e => e.currentTarget.submit() );
};

export const departamentFormValidator = () => {

  const form = document.querySelector( '#departament-form' );

  if ( !form ) return;

  const validator = new JustValidate( '#departament-form', {
    errorLabelStyle: null,
    errorLabelCssClass: [ 'field-error' ],
    errorFieldCssClass: [ 'invalid' ],
    successFieldCssClass: [ 'valid' ]
  } );

  validator
    .addField( '#name', [
      { rule: 'required' },
      { rule: 'minLength', value: 4 }
    ] )
    .addField( '#address', [
      { rule: 'required' },
      { rule: 'minLength', value: 4 }
    ] )
    .onSuccess( e => e.currentTarget.submit() );
};

export const assetFormValidator = () => {

  const form = document.querySelector( '#asset-form' );

  if ( !form ) return;

  const validator = new JustValidate( '#asset-form', {
    errorLabelStyle: null,
    errorLabelCssClass: [ 'field-error' ],
    errorFieldCssClass: [ 'invalid' ],
    successFieldCssClass: [ 'valid' ]
  } );

  validator
    .addField( '#name', [
      { rule: 'required' },
      { rule: 'minLength', value: 4 }
    ] )
    .addField( '#serialNumber', [
      { rule: 'required' },
      { rule: 'minLength', value: 4 }
    ] )
    .addField( '#employeeId', [
      { rule: 'required' },
      { rule: 'minLength', value: 4 }
    ] )
    .onSuccess( e => e.currentTarget.submit() );
};