import { orders } from '../data/orders.js';
import { removeFromCart } from '../data/cart.js';

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
    order.products.forEach((product) => {
      html += `
        <div class="order-card order-card-${product.productId}">
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

          <div class="order-product-item">
            <img src="${product.image}" alt="${product.name}" class="order-product-image" />
            <div class="order-product-details">
              <div class="product-name">${product.name}</div>
              <div class="product-price">Price: ${formatRupees(product.priceCents)}</div>
              <div class="product-quantity">Quantity: ${product.quantity}</div>
              <div class="product-delivery">Delivery in ${product.deliveryDays} days</div>

              <div class="order-actions">
                <button class="track-btn" data-order-id="${order.id}" data-product-id="${product.productId}">
                  Track Package
                </button>
                <button class="cancel-btn" data-order-id="${order.id}" data-product-id="${product.productId}">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });

  if (orders.length === 0) {
    html = `
      <div class="no-orders-message">
        <h3>No orders yet 😢</h3>
        <p>Looks like you haven’t placed any orders. Start shopping now!</p>
        <a href="amazon.html" class="continue-shopping-btn">Continue Shopping</a>
      </div>
    `;
  }

  ordersContainer.innerHTML = html;

  document.querySelectorAll('.cancel-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.orderId;
      const productId = btn.dataset.productId;

      const order = orders.find((o) => o.id === orderId);
      if (order) {
        order.products = order.products.filter((p) => p.productId !== productId);
        if (order.products.length === 0) {
          const index = orders.findIndex((o) => o.id === orderId);
          orders.splice(index, 1);
        }
      }

      localStorage.setItem('orders', JSON.stringify(orders));
      removeFromCart(productId);

      const container = document.querySelector(`.order-card-${productId}`);
      if (container) container.remove();

      if (orders.length === 0) renderOrders();
    });
  });

  document.querySelectorAll('.track-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.orderId;
      const productId = btn.dataset.productId;
      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
    });
  });
}

renderOrders();
