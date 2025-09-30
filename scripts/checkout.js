import { loadCart } from "../data/cart.js";
import { updateCheckoutUI } from "./checkout/ordersummary.js";
//import '../data/cart-class.js';
//import'../data/ YTnd-practice.js';
import { loadProductsFetch } from "../data/products.js";
 async function loadPage(){ try{ 
  await loadProductsFetch();
 await new Promise((resolve)=>{
   loadCart(()=>{
  
  resolve();
});
});} catch(error){console.log('error')}
 
  
  updateCheckoutUI(); }
loadPage();

/*Promise.all([loadProductsFetch(),new Promise((resolve)=>{
   loadCart(()=>{
  
  resolve();
})
  
})]).then(()=>{
updateCheckoutUI();
});*/





