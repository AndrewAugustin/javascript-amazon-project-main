class Cart{
  cartItems  ; // without # is public property
   #localStorageKey  ; //private property


  constructor(localStorageKey) {
      this.localStorageKey = localStorageKey;
      this.#localStorage();
    }

  #localStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
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
      }

      saveToLocalStg() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
      }

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
    }

    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems.cart = newCart;
      this.saveToLocalStg();
    }


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
}

const cart =  new Cart('cart-oop');
const businesscart = new Cart('cart-business'); 


//cart.#localStorageKey = 'test-key'; // will give error as private property cannot be accessed outside the class

console.log(cart);
console.log(businesscart);
console.log(businesscart instanceof Cart);


