export let cart = JSON.parse(localStorage.getItem('cart')) || [];
function saveToLocalStg() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId,productName) {
  let matchItem ;
      cart.forEach((cartitem)=>{
        if (productId === cartitem.productId) {
          matchItem = cartitem;
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
        saveToLocalStg();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToLocalStg();
}
