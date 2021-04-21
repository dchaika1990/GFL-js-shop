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
			const goods = this.cartGoods.map((data) => templateCartItem(data))
			totalWrap.textContent = `Total ${this.totalPrice()}`;
			cartWrap.innerHTML = goods.join('');
			this.countGoods();
			this.updateLocal();
		},
		updateLocal() {
			localStorage.setItem('cart', JSON.stringify(this.cartGoods))
		}
	}
	cart.renderCart();

	document.addEventListener('click', (e) => {
		let item = e.target;
		if (item) {
			if (item.hasAttribute('data-add-cart')) {
				let good = goods.find(g => g.id === +item.dataset.id)
				if (!good.count) {
					good.count = 1;
				} else if (good.count >= good.available) {
					item.disabled = true;
				} else {
					good.count = ++good.count
				}
				console.log(good.count, good.available)
				if (!cart.cartGoods.find(g => g.id === good.id)) {
					cart.cartGoods.push(good);
				}
				cart.renderCart();
			}
		}
	})
}

export default cartComponent;