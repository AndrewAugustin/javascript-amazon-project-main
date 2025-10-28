import {renderCheckoutPage} from '../checkout/ordersummary.js';
import { renderPaymentsummary } from '../checkout/paymentsummry.js';  
import { loadProducts} from '../data/product.js';
import { loadCart } from '../data/cart.js';


Promise.all([
  new Promise((resolve) => {
  console.log('start promise');
  
  loadProducts(()=>{
    console.log('finished the loading');
    
    resolve('value123');
  });
}),

new Promise((resolve)=>{
    
    console.log('start loading cart');
    loadCart(()=>{      
      console.log('finished loading cart');
      resolve();
    });
  })

]).then((value)=>{
  console.log(value);
  renderCheckoutPage();
  renderPaymentsummary();
});

/*
new Promise((resolve) => {
  console.log('start promise');
  
  loadProducts(()=>{
    console.log('finished the loading');
    
    resolve('value123');
  });
}).then((value)=>{
  return new Promise((resolve)=>{
    console.log(value);
    
    console.log('start loading cart');
    loadCart(()=>{
      console.log('finished loading cart');
      resolve();
    });
  });
}).then(()=>{
  renderCheckoutPage();
  renderPaymentsummary();
});
  
*/

// loadProducts(()=>{
//   loadCart(()=>{
//     renderCheckoutPage();
//     renderPaymentsummary();
//   });
// });
