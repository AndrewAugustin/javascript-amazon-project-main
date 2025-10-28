import { cart } from '../data/cart.js';
import { getProduct } from '../data/product.js';
import { getDeliveryOption } from '../data/deliveryDetail.js'; // ✅ fixed spelling

export function renderPaymentsummary() {

  let totalAmount = 0;
  let shippingAmount = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryId);

    if (!product || !deliveryOption) return;

    // ✅ Convert priceCents → Rupees
    totalAmount += (product.priceCents / 10) * cartItem.quantity;
    shippingAmount += deliveryOption.price * cartItem.quantity;
  });

  // ✅ Proper math, keep as numbers
  const beforeTaxAmount = totalAmount + shippingAmount;
  const taxAmount = Math.round(beforeTaxAmount * 0.18 * 100) / 100; // round to 2 decimals
  const finalAmount = beforeTaxAmount + taxAmount;

  // ✅ Format nicely
  const format = (amount) =>
    `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="item-quantity">Items (${cart.length}):</div>
      <div class="payment-summary-money">${format(totalAmount)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">${format(shippingAmount)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">${format(beforeTaxAmount)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (18%):</div>
      <div class="payment-summary-money">${format(taxAmount)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${format(finalAmount)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.item-quantity').innerHTML = ` (${cart.length}) items`;
  document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;

}