 import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
 import { product } from '../../data/product.js';
 import { currencyConvertor } from "../utility.js";
 import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 import { deliveryDetail } from '../../data/deliveryDetail.js';

 export function renderCheckoutPage() {

  let checkoutHtml = '';
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingProduct = '';
    product.forEach((prod)=>{
      if(prod.id === productId){
        matchingProduct = prod;
      }
    });

    const deliveryOptionId = cartItem.deliveryId;
    let deliveryOption ;
    
    deliveryDetail.forEach((delivery)=>{
      if(delivery.id === parseInt(deliveryOptionId)){
        deliveryOption = delivery;
      } 
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const formattedDate = deliveryDate.format('dddd, MMMM D');
    
    
    checkoutHtml +=
      `<div class="cart-item-container-${matchingProduct.id} cart-item-container">
            <div class="delivery-date">
              Delivery date: ${formattedDate}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">
                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                    <div class="product-price">
                    ₹ ${currencyConvertor(matchingProduct.price)}
                    </div>
                      <div class="product-quantity">
                      <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                      Update
                      </span>
                      <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                      Delete
                      </span>
                  </div>
              </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
        </div>`;
  });


  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let deliveryHtml = '';
    deliveryDetail.forEach((delivery)=>{
      const today = dayjs();
      const deliveryDate = today.add(delivery.deliveryDays, 'day');
      const formattedDate = deliveryDate.format('dddd, MMMM D');
      const priceString = delivery.price === 0 
      ? 'FREE Shipping' 
      : `₹ ${currencyConvertor(delivery.price)} - `;

      const ischecked =  delivery.id === parseInt(cartItem.deliveryId) ? 'checked' : '';

      deliveryHtml +=
      `<div class="delivery-option  js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-id="${delivery.id}">
          <input type="radio"
          ${ischecked}
            value="${delivery.id}"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
            ${formattedDate}
            </div>
            <div class="delivery-option-price">
             ${priceString} Shipping
            </div>
          </div>
        </div>`;
    });
    return deliveryHtml;
  }
  document.querySelector('.order-summary').innerHTML = checkoutHtml;
  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
      link.addEventListener('click', ()=>{
      const productID = link.dataset.productId;
      removeFromCart(productID);  
      const container = document.querySelector(`.cart-item-container-${productID}`);
      container.remove(); 
  });
});

document.querySelectorAll('.js-delivery-option')
.forEach((option)=>{
  option.addEventListener('click', ()=>{
    const { productId, deliveryId } = option.dataset;
    updateDeliveryOption(productId, deliveryId);
    renderCheckoutPage();
  });
});

}

