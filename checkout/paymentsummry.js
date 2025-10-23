import { cart} from '../../data/cart.js';
import { getProduct } from '../../data/product.js';    
import { getDelieryOption } from '../../data/deliveryDetail.js'; 

export function renderPaymentsummary() {

  let totalAmount = 0;
  let shippingAmount = 0;
  cart.forEach((cartItem)=>{
  const product = getProduct(cartItem.productId);
  totalAmount +=  (product.price * cartItem.quantity)*0.1;

  const deliveryOption = getDelieryOption(cartItem.deliveryId);
  shippingAmount  += (deliveryOption.price * cartItem.quantity)*0.1;
  });

    const BeforeTaxAmount = totalAmount + shippingAmount;
    const taxAmount = Math.round(BeforeTaxAmount * 0.18);
    const finalAmount = BeforeTaxAmount + taxAmount;
    const paymentSummaryHtml = 
          `<div class="payment-summary-title">
                Order Summary
           </div>

          <div class="payment-summary-row">
            <div class = "item-quantity">Items (0):</div>
            <div class="payment-summary-money">₹${totalAmount}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${shippingAmount}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${BeforeTaxAmount}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (18%):</div>
            <div class="payment-summary-money">₹${taxAmount}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${finalAmount}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

  document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;

}