const product= [
  {
    Image : 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating : {
      star : 4.5,
      count : 87
    },
    price : 1090,


  },
  {
    Image : 'images/products/intermediate-composite-basketball.jpg',
    name : 'Intermediate Size Basketball',
    rating : {
      star : 5.0,
      count : 87
    },
    price : 1090,


  }
];

// console.log('hlooo');
console.log(product);

let productHtml = '';

product.forEach((purchase)=>{
  productHtml += 
      `<div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src=${purchase.Image}>
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${purchase.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="images/ratings/rating-${purchase.rating.star * 10}.png">
                <div class="product-rating-count link-primary">
                  ${purchase.rating.count}
                </div>
              </div>

              <div class="product-price">
              ₹ ${purchase.price}
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

              <button class="add-to-cart-button button-primary">
                Add to Cart
              </button>
            </div>`
  

            
});

        //    console.log(productHtml);

            document.querySelector('.product-js-grid').innerHTML = productHtml;