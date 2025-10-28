import {renderCheckoutPage} from '../checkout/ordersummary.js';
import { renderPaymentsummary } from '../checkout/paymentsummry.js';  
import { loadProducts} from '../data/product.js';

loadProducts(()=>{
  renderCheckoutPage();
  renderPaymentsummary();
});
