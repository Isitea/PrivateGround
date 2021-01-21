{
	let obs = new MutationObserver( records => ( records.length ? console.log( true ) : console.log( false ) ) );
	obs.observe( document.querySelector( '#content' ), { childList: true, subtree: true } );
}

async function absoluteRemover () {
	function response ( action ) {
		return new Promise( function ( res ) {
			let obs = new MutationObserver( records => ( records.length ? res() : false ) );
			obs.observe( document.querySelector( '#content' ), { childList: true, subtree: true } );
			action();
		} );
	}
	function remover ( res ) {
		function remove() {
			[ ...document.querySelectorAll( 'td.check .check_box.only_box input' ) ].map( item => ( item.checked ? true : item.click() ) );
			try { document.querySelector( '.mycafe_bottom .common_btn_form.fr .btn2' ).click(); }
			catch { res(); }
		}
		let obs = new MutationObserver( function ( records ) {
			if ( records.length ) {
				let list = document.querySelectorAll( 'td.check .check_box.only_box input' );
				if ( list ) remove();
			}
		} );
		obs.observe( document.querySelector( '#content' ), { childList: true, subtree: true } );
		remove();
	}
	window.confirm = () => true;
	while ( !document.querySelector( '.mycafe_list tbody .no_data' ) ) {
		await response( () => document.querySelector( '.mycafe_list tbody .btns button' ).click() );
		await response( () => {} );
		let cafe = document.querySelector( '.mycafe_manage .tit' ).textContent;
		console.log( `카페: ${cafe} 이력 확인` );
		//await response( () => document.querySelector( '.mycafe_manage .manage_article .my_article :first-child' ).click() );
		//await response( () => {} );
		if ( !document.querySelector( '.mycafe_list tbody .no_data' ) ) await new Promise( res => remover( res ) );
		if ( document.querySelector( '.mycafe_list tbody .no_data' ) ) console.log( '글 삭제 완료' );
		await response( () => document.querySelector( '.mycafe_manage .manage_article .my_article :last-child' ).click() );
		await response( () => {} );
		if ( !document.querySelector( '.mycafe_list tbody .no_data' ) ) await new Promise( res => remover( res ) );
		if ( document.querySelector( '.mycafe_list tbody .no_data' ) ) console.log( '댓글 삭제 완료' );
		await response( () => document.querySelector( '.mycafe_manage .common_btn_form.fr .btn2' ).click() );
		await response( () => {} );
		console.log( `카페: ${cafe} 이력 확인 종료` );
		document.querySelector( '.mycafe_manage .mycafe_list tbody tr [type=checkbox]' ).click();
		await response( () => document.querySelector( '.mycafe_manage .common_btn_form.fr .btn2' ).click() );
        console.log( `카페: ${cafe} 이력 삭제 완료` );
        await new Promise( res => setTimeout( res, 500 ) );
	}
}
absoluteRemover().then( () => console.log( '모든 이력을 삭제하였습니다' ) );
