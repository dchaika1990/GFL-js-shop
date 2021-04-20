import renderGoods from "./modules/renderGoods";
import cartComponent from "./modules/renderCard";

const app = {};

app.init = function ({goodsSelector, cartSelector}) {
	renderGoods(goodsSelector);
	cartComponent(cartSelector);
}

export default app;