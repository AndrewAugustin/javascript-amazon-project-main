import { orders } from '../data/orders.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const order = orders.find((o) => o.id === orderId);
const product = order?.products.find((p) => p.productId === productId);

const deliveryDateElem = document.querySelector('.delivery-date');
const productInfoElems = document.querySelectorAll('.product-info');
const productImageElem = document.querySelector('.product-image');
const progressBarElem = document.querySelector('.progress-bar');
const progressLabels = document.querySelectorAll('.progress-label');

if (product && order) {
  const expectedDate = new Date(order.orderTime);
  expectedDate.setDate(expectedDate.getDate() + product.deliveryDays);

  deliveryDateElem.textContent = `Arriving on ${expectedDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })}`;

  productInfoElems[0].textContent = `Product: ${product.name}`;
  productInfoElems[1].textContent = `Quantity: ${product.quantity}`;
  productImageElem.src = product.image;
  productImageElem.alt = product.name;

  let progress = 0;
  const steps = ['Preparing', 'Shipped', 'Delivered'];

  const interval = setInterval(() => {
    progress += 1;
    progressBarElem.style.width = `${(progress / 3) * 100}%`;

    progressLabels.forEach((label, index) => {
      if (index < progress) label.classList.add('active');
    });

    if (progress === 3) clearInterval(interval);
  }, 1000);
} else {
  document.querySelector('.order-tracking').innerHTML = `
      Order not found. Please check again.
  `;
}
