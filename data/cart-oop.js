function Cart(localStorageKey){
const cart={ cartItems:[],
   loadFromStorage(){ this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));
if (!this.cartItems) { 
  this.cartItems = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId:'1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId:'2'
  }];
}
},
saveToStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(cart.cartItems));
},
 addTocart(productId) {
  let matchingItem;
   this.calculateCartItemsQuantity();
  const selectedQuantity=document.querySelector(`.js-quantity-selector-${productId}`);
   const quantity=Number(selectedQuantity.value);

  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    };
  });  
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    this.cartItems.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId:'1'
});
  }

  this.saveToStorage();


}, removeFromcart(productId) {
  const newcart = [];

  this.cartItems.forEach((cartItem) => {
    if (this.cartItems.productId !== cartItem.productId) {
      newcart.push(cartItem);
    }
  });

  this.cartItems = newcart;

  this.saveToStorage();
},
updateDeliveryOption(productId, deliveryOptionId){
let matchingItem;
  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.deliveryOptionId=deliveryOptionId;
 this.saveToStorage();
},
calculateCartItemsQuantity() {
  let cartItemsQuantity = 0;

  this.cartItems.forEach((cartItem) => {
    cartItemsQuantity += cartItem.quantity;
  });

  return cartItemsQuantity;
},
 updateQuantity(productId, newQuantity) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  this.saveToStorage();
}};
return cart;
}
const cart=Cart('cart-oop');
const bussinessCart=Cart('cart-bussiness');


cart.loadFromStorage();


bussinessCart.loadFromStorage();
console.log(cart);
console.log(bussinessCart);
