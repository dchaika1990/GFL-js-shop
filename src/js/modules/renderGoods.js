import {getGoods} from "../services/request";
import {setStore, getStore, renderStore} from "../services/store";
import makeRender from "../services/render";
import emitter from "../services/emitter";

const renderGoods = (select) => {
	const goodsWrap = document.querySelector(select);
	let goods = [];

	function template(goods) {
		let templateGoodItem = makeRender('.templateGoodItem');
		let template = goods.map((data) => templateGoodItem(data))
		goodsWrap.innerHTML = template.join('')
	}

	function render() {
		getGoods('https://my-json-server.typicode.com/achubirka/db/products')
			.then(res => {
				goods = res;
				template(res);
			})
	}

	emitter.subscribe('event:change-item', item => {
		const goods = getStore('goods');
		let idx = goods.findIndex(g => g.id === item.id)
		goods[idx].available = item.available - item.count
		setStore('goods', goods)
		render();
	})

	document.addEventListener('click', (e) => {
		let item = e.target;
		if (item) {
			if (item.hasAttribute('data-add-cart')) {
				let good = goods.find(g => g.id === +e.target.dataset.id)
				emitter.emit('event:add-product', good)
			}
		}
	})

	window.addEventListener('storage', (e) => {
		if (e.key === 'goods') {
			render();
		}
	})
	render();
}

export default renderGoods;