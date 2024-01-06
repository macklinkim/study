const root = document.querySelector(":root");
let buttons = document.querySelectorAll("[data-name]")
buttons.forEach( ( button ) => {
	button.addEventListener( "click", () => {
		root.classList.toggle(button.dataset.name)
	})
})