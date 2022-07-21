import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from "./StateProvider";;

function CheckoutProduct({ id, title, image, price, rating, hideButton }) {
    const [{ cart }, dispatch] = useStateValue();

    const removeFromCart = () => {
      // remove the item from the cart
      dispatch({
          type: 'REMOVE_FROM_CART',
          id: id,
      })
    }

  return (
    <div className="checkout-product">
        <img className='checkout-product-image' src={image} alt="product_image"/>
        <div className='checkout-product-info'>
            <p className='checkout-product-title'>{title}</p>
            <p className="checkout-product-price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkout-product-rating">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <p> <img className="star" src="https://emojiguide.com/wp-content/uploads/platform/twitter/43154.png" alt="rating-star" /> </p>
                  ))}
            </div>
            {!hideButton && (<button onClick={removeFromCart}> Remove from Cart </button>) }
        </div>
    </div>
  )
}

export default CheckoutProduct