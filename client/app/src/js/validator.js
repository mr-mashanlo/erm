import JustValidate from 'just-validate';

export const initAuthFormValidator = () => {

  const form = document.querySelector( '#auth-form' );

  if ( !form ) return;

  const validator = new JustValidate( '#auth-form', {
    errorLabelStyle: null,
    errorLabelCssClass: [ 'form__error' ],
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
