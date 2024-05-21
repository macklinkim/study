const buttons = document.querySelectorAll( "[data-nav-button]" );
buttons.forEach( button => {
	button.addEventListener( "click", () => {
		buttons.forEach( _button => {
			_button.classList.remove( "is_active" )
		})
		button.classList.add( "is_active" )
	})
})