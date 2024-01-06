const items = document.querySelectorAll("[data-animate]")
const observer = new IntersectionObserver( (entries, observer) => {
	entries.forEach( (entry) => {
		let loadedEl = entry.target;
		if ( entry.isIntersecting ) {
			loadedEl.classList.add("is_active")
		}
	})
}, { threshold: 0.5 })
items.forEach( (item) => {
	observer.observe(item)
})