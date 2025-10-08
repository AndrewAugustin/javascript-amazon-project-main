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
              ₹ ${((purchase.price)/10).toFixed(2)}
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


  document.querySelector('.product-js-grid').innerHTML = productHtml;

  document.querySelectorAll('.ToAddCart').forEach((solve)=>{
    solve.addEventListener('click', ()=>{
       
      const productName = solve.dataset.productName;
      const productId=  solve.dataset.productId;

      let matchItem ;
      cart.forEach((item)=>{
        if (productId === item.productId) {
          matchItem = item;
        }
        });

        if (matchItem) {
          matchItem.quantity += 1;
        }else{
        cart.push({
          productName : productName,
          productId : productId,
          quantity : 1
          });
        }
      
        let cartQuantity = 0;
        cart.forEach((item)=>
        {
          cartQuantity += item.quantity;
        })

      document.querySelector('.cart-quantity').innerHTML = cartQuantity;
      
      console.log(cartQuantity);
      
      console.log(cart);
      
    });
  });