import React, { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

const CartItemDetails = ({ cartItem,loadCart }) => {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  if (!cartItem || !cartItem.product) return null;
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    
      await loadCart();
  };
       const updateQuantity=()=>{
        if(isUpdatingQuantity){
          setIsUpdatingQuantity(false);
        }
        else{
           setIsUpdatingQuantity(true);
        }
       }
  
 
  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
        alt={cartItem.product.name}
      />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{isUpdatingQuantity
            ?<input className="quantity-textbox" type="text" />
            :<span className="quantity-label">{cartItem.quantity}</span>
            }
            
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update</span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete</span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails;
