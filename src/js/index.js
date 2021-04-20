import fixHeader from "./modules/fixHeader";
import nav from "./modules/nav";
import Calculator from "./modules/Calculator";

document.addEventListener('DOMContentLoaded', () =>{
    fixHeader('.page_header');
    nav();
    new Calculator({
        selectorCalc: '.calculator',
        SelectorInput: '.calculator-input'
    }).init();
})