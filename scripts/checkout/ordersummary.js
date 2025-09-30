import {
  cart
 } from '../../data/cart-class.js';
import { getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import{deliveryOptions, getDeliveryOption} from'../../data/deliveryoptions.js'
import { renderPaymentSummary } from './payment.js';

  import dayjs from'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
  import { renderCheckoutHeader } from './checkoutHeader.js';
  export function updateCheckoutUI() {
  renderOrderSummary();        // re-renders DOM
  renderPaymentSummary();      // updates price
  renderCheckoutHeader();      // updates header
  attachEventListeners();      // reattaches all events
}

  export function renderOrderSummary(){
let cartSummaryHTML = '';

cart.cartItems.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct=getProduct(productId);
const deliveryOptionId=cartItem.deliveryOptionId;
const deliveryOption=getDeliveryOption(deliveryOptionId);
  const today = dayjs();
 
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
   Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
           ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
                  <span class="update-quantity-link  link-primary js-update-link
                  " data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${
          deliveryOptionsHTML(matchingProduct, cartItem)
          }
        
          
        </div>
      </div>
    </div>
  `;
});
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let HTML = ``;
  deliveryOptions.forEach((deliveryOption) => {
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    const today = dayjs();
    const optionDeliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = optionDeliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0
      ? 'Free'
      : `${formatCurrency(deliveryOption.priceCents)}`;

    HTML += `<div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}- Shipping
          </div>
        </div>
      </div>`;
  });
  return HTML;
  
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;
  
  }
// All event listeners must be re-attached after rendering
function attachEventListeners() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      updateCheckoutUI(); // OK: re-render after removing
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      // DO NOT call updateCheckoutUI() here!
    });
  });

  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const Quantity = container.querySelector('.quantity-input');
      const updatedQuantity = Number(Quantity.value);
      cart.updateQuantity(productId, updatedQuantity);
     updateCheckoutUI()
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
    updateCheckoutUI()
    });
  });
}








