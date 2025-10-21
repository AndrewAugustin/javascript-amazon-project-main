export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [
    {
      productId : `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
      quantity : 2,
      deliveryId : '1'
    },
    {
      productId : `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
      quantity : 1,
      deliveryId : '2'
    }
  ];
};

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
          quantity : 1,
          deliveryId : '1'
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


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchItem ;
      cart.forEach((cartitem)=>{
        if (productId === cartitem.productId) {
          matchItem = cartitem;
        }
        });

        matchItem.deliveryId = deliveryOptionId;
        saveToLocalStg();
}