import { cart } from "../../data/cart-class.js";
import{  getProduct} from'../../data/products.js'
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "./orders.js";
  
export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;
cart.cartItems.forEach((cartItem)=>{
const product=getProduct(cartItem.productId);
productPriceCents+=product.priceCents*cartItem.quantity;
const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
shippingPriceCents+=deliveryOption.priceCents;
});
const totalBeforeTax=shippingPriceCents+productPriceCents;
const taxCents=totalBeforeTax*0.1;
const totalCents=totalBeforeTax+taxCents;
        const paymentSummaryHTML= `<div class="payment-summary-title">Order Summary</div>

                <div class="payment-summary-row">
                    <div class="js-cart-items"></div>
                    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
                </div>
                
                
                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
                </div>
                <div class="payment-summary-row">
                    <div>Total Before Tax:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
                </div>
                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div></div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
                </div>

                <button class=" YT]e-order-button button-primary js-Ve-order">
                    Place your order
                </button>`;
                document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
                document.querySelector('.js-cart-items').innerHTML=`items(${cart.calculateCartItemsQuantity()}):`;
              
                document.querySelector('.js-place-order').addEventListener('click',async()=>{const response=await fetch('https://Supersimplebackend.dev/orders',{method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },body:JSON.stringify({
                        cart:cart
                    })

                });
             const order= await  response.json();
             addOrder(order);
             window.location.href='orders.html';
            });
}