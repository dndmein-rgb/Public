import React from 'react'
import DeliveryOptions from './DeliveryOptions';
import CartItemDetails from './CartItemDetails';
import DeliveryDate from './DeliveryDate';

const OrderSummary = ({cart,deliveryOptions}) => {
  return (
    <div className="order-summary">
               {deliveryOptions.length > 0 &&
                 cart.map((cartItem) => {
                  
   
                   return (
                     <div key={cartItem.productId} className="cart-item-container">
                      <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions}/>
   
                       <div className="cart-item-details-grid">
                         <CartItemDetails cart={cart}/>
   
                         <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions}/>
                       </div>
                     </div>
                   );
                 })}
             </div>
  )
}

export default OrderSummary