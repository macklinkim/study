const root = document.querySelector(".contents");
const hide = document.querySelector(".grid");
const show = document.querySelector(".full-bread");
let buttons = document.querySelectorAll("[data-name]")
buttons.forEach( ( button ) => {
	button.addEventListener( "click", () => {
    if(show.style.visibility=='hidden'){
      show.style.visibility='visible';
    }else{
      show.style.visibility='hidden';
    }
	})
})