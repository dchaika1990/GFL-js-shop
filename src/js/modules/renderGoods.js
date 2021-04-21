import {getGoods} from "../services/request";
import makeRender from "../services/render";

const renderGoods = (select) => {
	const goodsWrap = document.querySelector(select)
	getGoods('http://my-json-server.typicode.com/achubirka/db/products')
		.then(res => template(res))
	function template(arr) {
		let templateGoodItem = makeRender('.templateGoodItem');
		let template = arr.map((data) => {
			return templateGoodItem(data)
		})
		goodsWrap.innerHTML = template.join('')
	}
}

export default renderGoods;