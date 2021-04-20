const cartComponent = (selector, wrapSelector) => {
	const selectCart = document.querySelector(selector);
	const cartWrap = selectCart.querySelector(wrapSelector);
	const totalWrap = selectCart.querySelector('.cart-total');
	const goods = JSON.parse(localStorage.getItem('goods'));

	const cart = {
		cartGoods: [],
		countGoods() {
			const count = this.cartGoods.reduce((sum, good) => sum + good.count, 0);
			selectCart.querySelector('.cart-count').textContent = `Cart (${count})`;
		},
		totalPrice(){
			return this.cartGoods.reduce((sum, good) => sum + good.price * good.count, 0)
		},
		renderCart() {
			cartWrap.textContent = '';
			const goods = this.cartGoods.map(({id, name, price, available, count}) => {
				return `
					<div class="cart-item" data-id="${id}" data-available="${available}">
						<div class="cart-item-top">
							<h5 class="cart-item-name">${name}</h5>
							<span class="cart-item-price">${price}</span>
						</div>	
						<div class="cart-item-bottom">
							<button class="btn cart-item-minus">-</button>
							<span>${count}</span>
							<button class="btn cart-item-plus">+</button>
						</div>
					</div>
				`
			})
			totalWrap.textContent = `Total ${this.totalPrice()}`;
			cartWrap.innerHTML = goods.join('');
			this.countGoods();
		}
	}
	cart.renderCart();

	document.addEventListener('click', (e)=> {
		let item = e.target;
		if (item) {
			if (item.hasAttribute('data-add-cart')) {
				let good = goods.find( g => g.id === +item.dataset.id )
				if (!good.count) {
					good.count = 1;
					cart.cartGoods.push(good);
				} else if (good.count >= good.available){
					return
				} else {
					good.count = ++good.count
				}
				cart.renderCart();
			}
		}
	})
}

export default cartComponent;