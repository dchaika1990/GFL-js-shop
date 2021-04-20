import fixHeader from "./modules/fixHeader";
import app from "./app";

document.addEventListener('DOMContentLoaded', () =>{
    fixHeader('.page_header');
    app.init({
        goodsSelector: '.goods',
        cartSelector: '.cart'
    });
})