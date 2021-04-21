const makeRender = (selector) => {
	let template = document.querySelector(selector).innerHTML;
	return new Function('data', 'return `' + template + '`');
}

export default makeRender;