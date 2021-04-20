import {getGoods} from "../services/request";

const renderGoods = (select) => {
	const goodsWrap = document.querySelector(select)
	getGoods('http://my-json-server.typicode.com/achubirka/db/products')
		.then(res => template(res))
	function template(arr) {
		let template = arr.map(({id, name, price, available}) => {
			return `
				<div data-available="${available}" class="good">
					<h3 class="good-name">${name}</h3>
					<p>Some short description</p>
					<div class="good-price-wrap">
						<span class="good-price">${price}</span>
						<button data-id="${id}" data-add-cart class="btn btn-maincolor">Add to card</button>
					</div>
				</div>
			`
		})
		goodsWrap.innerHTML = template.join('')
	}
}

export default renderGoods;