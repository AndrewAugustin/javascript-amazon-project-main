import { cart } from '../data/cart.js';
import { getProduct } from '../data/product.js';
import { getDeliveryOption } from '../data/deliveryDetail.js';
import { addOrder } from '../data/orders.js';

export function renderPaymentsummary() {
  let totalAmount = 0;
  let shippingAmount = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryId);

    if (!product || !deliveryOption) return;

    totalAmount += (product.priceCents / 10) * cartItem.quantity;
    shippingAmount += (deliveryOption.price * cartItem.quantity) / 10;
  });

  const beforeTaxAmount = totalAmount + shippingAmount;
  const taxAmount = Math.round(beforeTaxAmount * 0.18 * 100) / 100;
  const finalAmount = beforeTaxAmount + taxAmount;

  const format = (amount) =>
    `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const paymentSummaryHtml = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div class="item-quantity">Items (${cart.length}):</div>
      <div class="payment-summary-money">${format(totalAmount)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
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
    <button class="place-order-button button-primary js-place-order">Place your order</button>
  `;

  document.querySelector('.payment-summary').innerHTML = paymentSummaryHtml;
  document.querySelector('.item-quantity').innerHTML = `(${cart.length}) items`;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart })
        });

        const backendOrder = await response.json();

        // ✅ Create a full local order with product info
        const localOrder = {
          id: backendOrder.id || crypto.randomUUID(),
          orderTime: new Date().toISOString(),
          totalCostCents: Math.round(finalAmount * 100),
          products: cart.map((cartItem) => {
            const product = getProduct(cartItem.productId);
            const delivery = getDeliveryOption(cartItem.deliveryId);
            return {
              productId: product.id,
              name: product.name,
              image: product.image,
              quantity: cartItem.quantity,
              deliveryId: delivery.id,
              deliveryDays: delivery.deliveryDays,
              priceCents: product.priceCents
            };
          })
        };

        addOrder(localOrder);
      } catch (error) {
        console.error('Unexpected error, try again later');
      }

      window.location.href = 'orders.html';
    });
}
