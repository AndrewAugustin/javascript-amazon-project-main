export const deliveryDetail = [{
  id : 1,
  deliveryDays : 7,
  price : 0
},
{
  id : 2,
  deliveryDays : 3,
  price : 400
},
{
  id : 3,
  deliveryDays : 2,
  price : 600
}];

export function getDelieryOption(deliveryOptionId) {
  let deliveryOption = '';
      deliveryDetail.forEach((delivery)=>{
        if(delivery.id === parseInt(deliveryOptionId)){
          deliveryOption = delivery;
        } 
      }); 

  return deliveryOption || deliveryOption[0];
}