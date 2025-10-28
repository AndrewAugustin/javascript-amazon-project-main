import {renderCheckoutPage} from '../checkout/ordersummary.js';
import { renderPaymentsummary } from '../checkout/paymentsummry.js';  
import { loadProductsFetch} from '../data/product.js';
import { loadCart } from '../data/cart.js';



async function loadPage(){

  try {

     // throw 'error';
      await loadProductsFetch();
      await new Promise((resolve)=>{
      loadCart(()=>{      
        resolve();
      });
    });
  } catch (error) {
    console.log('Unexpected Error, Pleaaase try again later')
  }

  

  renderCheckoutPage();
  renderPaymentsummary();


}

loadPage(); 









////////////////Promise.All////////////

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    
    loadCart(()=>{      
      resolve();
    });
  })

]).then((value)=>{
  renderCheckoutPage();
  renderPaymentsummary();
});
*/


//////////////////Promise chaining///////////////
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


/////////////////////////////////
/*
loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutPage();
    renderPaymentsummary();
  });
});
*/
