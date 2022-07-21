import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating}) {
    const [{ cart }, dispatch] = useStateValue();

    const addToCart = () => {
        // Dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_CART',
            item: {
              id: id,
              title: title,
              image: image,
              price: price,
              rating: rating,
            },
          });
    };  

  return (
    <div className="product">
        <img src={image} alt="product_image"/>
        <div className="product-info">
            <p> { title } </p>
            <p className="product-price">
                <small> ₹ </small>
                <strong> { price } </strong>
            </p>
            <div className="product-rating">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <p> <img className="star" src="https://emojiguide.com/wp-content/uploads/platform/twitter/43154.png" alt="rating-star" /> </p>
                  ))}
            </div>
        </div>
        <button onClick={addToCart}> Add to Cart </button>
    </div>
  )
}

export default Product