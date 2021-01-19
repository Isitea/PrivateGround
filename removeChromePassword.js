async function remove() {
	let R = document.querySelector( 'settings-ui' ).shadowRoot.querySelector( '#main' ).shadowRoot.querySelector( 'settings-basic-page' ).shadowRoot.querySelector( '#basicPage settings-autofill-page' ).shadowRoot.querySelector( '#pages #passwordSection' ).shadowRoot.querySelector( '#passwordsListHandler' );
	let more;
	while ( more = R.querySelector( 'password-list-item' ).shadowRoot.querySelector( '#moreActionsButton' ) ) {
		console.log( R.querySelector( 'password-list-item' ).shadowRoot.querySelector( '#originUrl' ).textContent )
		await new Promise( res => res( more.click() ) );
		await new Promise( res => res( R.shadowRoot.querySelector( '#menu #menuRemovePassword' ).click() ) );
		await new Promise( res => setTimeout( res, 100 ) );
	}
}
remove();

