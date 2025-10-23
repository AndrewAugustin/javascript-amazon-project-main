import { cart , addToCart} from '../data/cart.js';
import { product } from '../data/product.js';
import { currencyConvertor } from "./utility.js";
let productHtml = '';

product.forEach((purchase)=>{
  productHtml += 
      `<div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src=${purchase.image}>
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${purchase.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="images/ratings/rating-${purchase.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                  ${purchase.rating.count}
                </div>
              </div>

              <div class="product-price">
              ₹ ${currencyConvertor(purchase.price)}
              </div>

              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div class="product-spacer"></div>

              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary ToAddCart"
               data-product-name = "${purchase.name}" data-product-id = "${purchase.id}">
                Add to Cart
              </button>
            </div>`         
            
});

  function updateCartQuantity() {
        let cartQuantity = 0;
        cart.forEach((cartitem)=>
        {
          cartQuantity += cartitem.quantity;
        })
              document.querySelector('.cart-quantity').innerHTML = cartQuantity;

                    console.log(cartQuantity);
      }
    

  document.querySelector('.product-js-grid').innerHTML = productHtml;
  document.querySelectorAll('.ToAddCart').forEach((solve)=>{
  solve.addEventListener('click', ()=>{
      const productName = solve.dataset.productName;
      const productId=  solve.dataset.productId;
      addToCart(productId,productName);
      updateCartQuantity();
    });
  });