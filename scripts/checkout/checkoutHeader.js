import { cart } from "../../data/cart-class.js";
export function renderCheckoutHeader(){
document.querySelector('.checkout-header-middle-section').innerHTML=`Checkout(${cart.calculateCartItemsQuantity()} items)`;
}