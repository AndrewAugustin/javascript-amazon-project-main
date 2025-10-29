import { orders } from '../data/orders.js';

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatRupees(cents) {
  const amount = cents / 10;
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

function renderOrders() {
  const ordersContainer = document.querySelector('.orders-grid');
  if (!ordersContainer) return;

  let html = '';

  orders.forEach((order) => {
    html += `
      <div class="order-card">
        <div class="order-header">
          <div>
            <div class="order-label">Order Placed:</div>
            <div>${formatDate(order.orderTime)}</div>
          </div>
          <div>
            <div class="order-label">Total:</div>
            <div>${formatRupees(order.totalCostCents)}</div>
          </div>
          <div>
            <div class="order-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-products">
          ${order.products
            .map(
              (product) => `
              <div class="order-product-item">
                <img src="${product.image}" alt="${product.name}" class="order-product-image" />
                <div class="order-product-details">
                  <div class="product-name">${product.name}</div>
                  <div class="product-price">Price: ${formatRupees(product.priceCents)}</div>
                  <div class="product-quantity">Quantity: ${product.quantity}</div>
                  <div class="product-delivery">Delivery in ${product.deliveryDays} days</div>
                </div>
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `;
  });

  ordersContainer.innerHTML = html;
}

renderOrders();
