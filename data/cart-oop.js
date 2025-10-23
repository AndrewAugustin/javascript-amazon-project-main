function Cart(localStorageKey) {


const cart = {
   cartItems : undefined,
    localStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        if (!this.cartItems) {
          this.cartItems = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",  
            quantity: 1,
            deliveryId: '1'
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            deliveryId: '2'
          }
        ];
        }
      },

    saveToLocalStg() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
      },

    addToCart(productId,productName) {
       let matchItem ;
       this.cartItems.forEach((cartitem)=>{
        if (productId === cartitem.productId) {
          matchItem = cartitem;
        }
        });

        if (matchItem) {
          matchItem.quantity += 1;
        }else{
        this.cartItems.push({
          productName : productName,
          productId : productId,
          quantity : 1,
          deliveryId : '1'
          });
        }
        this.saveToLocalStg();
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems.cart = newCart;
      this.saveToLocalStg();
    },


      updateDeliveryOption(productId, deliveryOptionId) {
        let matchItem ;
        this.cartItems.forEach((cartitem)=>{
        if (productId === cartitem.productId) {
          matchItem = cartitem;
        }
        });

        matchItem.deliveryId = deliveryOptionId;
        this.saveToLocalStg();
      }
};


return cart;
}

const cart = Cart('cart-oop');
const businesscart = Cart('cart-business'); 
cart.localStorage();


const Businesscart = {
   cartItems : undefined,
    localStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-business'));
        if (!this.cartItems) {
          this.cartItems = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",  
            quantity: 1,
            deliveryId: '1'
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            deliveryId: '2'
          }
        ];
        }
      },

    saveToLocalStg() {
      localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
      },

    addToCart(productId,productName) {
       let matchItem ;
       this.cartItems.forEach((cartitem)=>{
        if (productId === cartitem.productId) {
          matchItem = cartitem;
        }
        });

        if (matchItem) {
          matchItem.quantity += 1;
        }else{
        this.cartItems.push({
          productName : productName,
          productId : productId,
          quantity : 1,
          deliveryId : '1'
          });
        }
        this.saveToLocalStg();
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems.cart = newCart;
      this.saveToLocalStg();
    },


      updateDeliveryOption(productId, deliveryOptionId) {
        let matchItem ;
        this.cartItems.forEach((cartitem)=>{
        if (productId === cartitem.productId) {
          matchItem = cartitem;
        }
        });

        matchItem.deliveryId = deliveryOptionId;
        this.saveToLocalStg();
      }
};

Businesscart.localStorage();


console.log(cart);
console.log(Businesscart);  