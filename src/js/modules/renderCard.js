import makeRender from "../services/render";

const cartComponent = (selector) => {
	const selectCart = document.querySelector(selector);
	const cartWrap = selectCart.querySelector('.cart-wrap');
	const totalWrap = selectCart.querySelector('.cart-total');
	const goods = JSON.parse(localStorage.getItem('goods'));

	const cart = {
		cartGoods: localStorage.cart ? JSON.parse(localStorage.getItem('cart')) : [],
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
		plusGood(handler, id){
			this.cartGoods.forEach(item => {
				if (item.id === id) item.count++;
				if (item.count > item.available) handler.disabled = true;
			})
			this.renderCart();
		},
		minusGood(id){
			this.cartGoods.forEach(item => {
				(item.id === id)
					? (item.count <= 1) ? this.deleteGoods(id) : item.count--
					: null;
			})
			this.renderCart();
		},
		addCartGoods(handler ,id){
			let cartItem = goods.find(g => g.id === +id)
			if (!this.cartGoods.find(g => g.id === cartItem.id)) {
				if (!cartItem.count) cartItem.count = 1;
				this.cartGoods.push(cartItem);
				this.renderCart();
			} else {
				this.plusGood(handler, id)
			}
		},
		updateLocal() {
			localStorage.setItem('cart', JSON.stringify(this.cartGoods))
		}
	}
	cart.renderCart();

	document.addEventListener('click', (e) => {
		let item = e.target;

		if (item) {
			if (item.hasAttribute('data-add-cart')) cart.addCartGoods(item, +item.dataset.id);
			if (item.hasAttribute('data-plus')) cart.plusGood(item, +item.parentNode.parentNode.dataset.id);
			if (item.hasAttribute('data-minus')) cart.minusGood(+item.parentNode.parentNode.dataset.id);
		}
	})
}

export default cartComponent;