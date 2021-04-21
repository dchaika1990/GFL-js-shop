import makeRender from "../services/render";
import {getStore, setStore} from "../services/store";
import emitter from "../services/emitter";

const cartComponent = (selector) => {
	const selectCart = document.querySelector(selector);
	const cartWrap = selectCart.querySelector('.cart-wrap');
	const totalWrap = selectCart.querySelector('.cart-total');

	const cart = {
		cartGoods: getStore('cart'),
		countGoods() {
			const count = this.cartGoods.reduce((sum, good) => sum + good.count, 0);
			selectCart.querySelector('.cart-count').textContent = `Cart (${count})`;
		},
		totalPrice() {
			return this.cartGoods.reduce((sum, good) => sum + good.price * good.count, 0)
		},
		renderCart() {
			cartWrap.textContent = '';
			let templateCartItem = makeRender('.templateCartItem');
			const cartItems = this.cartGoods.map((data) => templateCartItem(data))
			totalWrap.textContent = `Total ${this.totalPrice()}`;
			cartWrap.innerHTML = cartItems.join('');
			this.countGoods();
			this.updateLocal();
		},
		deleteGoods(id) {
			this.cartGoods = this.cartGoods.filter(good => id !== good.id);
			this.renderCart();
		},
		plusGood(id){
			this.cartGoods.forEach(item => {
				if (item.id === id) {
					if (item.count < item.available) item.count++;
					emitter.emit('event:change-item', item)
				}
			})
			this.renderCart();
		},
		minusGood(id){
			this.cartGoods.forEach(item => {
				if (item.id === id) {
					if (item.count <= 1) this.deleteGoods(id);
					emitter.emit('event:change-item', item)
					item.count--;
				}
			})
			this.renderCart();
		},
		addCartGoods(cartItem){
			if (!this.cartGoods.find(g => g.id === cartItem.id)) {
				if (!cartItem.count) cartItem.count = 0;
				this.cartGoods.push(cartItem);
			}
			this.plusGood(cartItem.id)
		},
		updateLocal() {
			setStore('cart', this.cartGoods);
		}
	}

	cart.renderCart();

	document.addEventListener('click', (e) => {
		let item = e.target;
		if (item) {
			let id = +item.parentNode.parentNode.dataset.id;
			if (item.hasAttribute('data-plus')) cart.plusGood(id);
			if (item.hasAttribute('data-minus')) cart.minusGood(id);
		}
	})

	emitter.subscribe('event:add-product', good => {
		cart.addCartGoods(good);
	})

	window.addEventListener('storage', e => {
		if (e.key === 'cart') {
			cart.cartGoods = JSON.parse(e.newValue);
			cart.renderCart()
		}
	})
}

export default cartComponent;