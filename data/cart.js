export const cart = [];
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
}

