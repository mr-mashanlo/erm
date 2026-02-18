export const handleSortButtons = () => {
  const buttons = document.querySelectorAll( '.sort-button' );

  buttons.forEach( button => button.addEventListener( 'click', e => {
    const params = new URLSearchParams( window.location.search );
    const sort = e.currentTarget.dataset.sort;
    const order = params.get( 'order' ) === 'asc' ? 'desc' : 'asc';
    params.set( 'sort', sort );
    params.set( 'order', order );
    window.location.search = params.toString();
  } ) );
};

export const handlePaginationButtons = () => {
  const buttons = document.querySelectorAll( '.pagination-button' );

  buttons.forEach( button => button.addEventListener( 'click', e => {
    const params = new URLSearchParams( window.location.search );
    const page = e.currentTarget.dataset.page;
    params.set( 'page', page );
    window.location.search = params.toString();
  } ) );
};

export const handleSearchForm = () => {
  const searchForms = document.querySelectorAll( '.search-form' );

  searchForms.forEach( form => {
    const params = new URLSearchParams( window.location.search );
    const name = params.get( 'name' );
    form.querySelector( '#search' ).setAttribute( 'value', name || '' );
  } );

  searchForms.forEach( filterButton => filterButton.addEventListener( 'submit', e => {
    e.preventDefault();
    const formData = new FormData( e.target );
    const params = new URLSearchParams( window.location.search );
    params.delete( 'page' );
    params.set( 'name', formData.get( 'name' ) );
    window.location.search = params.toString();
  } ) );
};