const nav = () => {
	const nav = document.querySelector('.nav');
	const body = document.querySelector('body');
	let display;

	function calcScroll() {
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	document.addEventListener('click', e => {
		e.preventDefault();
		const elem = e.target;
		if (elem && elem.hasAttribute('data-menu-toggle')){
			nav.classList.toggle('nav-show');
			body.classList.toggle('overflow-hidden');
			display = !display;

			display
				? document.body.style.marginRight = `${calcScroll()}px`
				: document.body.style.marginRight = ``
		}
	})
}

export default nav;