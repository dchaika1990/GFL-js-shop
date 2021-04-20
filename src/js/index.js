import fixHeader from "./modules/fixHeader";
import renderGoods from "./modules/renderGoods";
import cartComponent from "./modules/renderCard";

document.addEventListener('DOMContentLoaded', () =>{
    fixHeader('.page_header');
    renderGoods('.goods');
    cartComponent('.cart', '.cart-wrap');
})