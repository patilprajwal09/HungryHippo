import React, { useContext, useState, memo } from 'react';
import PropTypes from 'prop-types';
import './fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const itemCount = cartItems[id] || 0;

  return (
    <article className="food-item" role="listitem">
      <div className="food-item-img-container">
        {!imageLoaded && (
          <div className="food-item-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <img 
          src={image} 
          alt={imageError ? `${name} - Image not available` : `${name} - ${description}`}
          className={`food-item-image ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {imageError && (
          <div className="food-item-image-fallback">
            <span>🍽️</span>
          </div>
        )}
        
        {!itemCount ? (
          <button 
            className="add-button" 
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            disabled={imageError}
          >
            <img 
              src={assets.add_icon_white} 
              alt="Add to cart" 
            />
          </button>
        ) : (
          <div className="food-item-counter">
            <button 
              onClick={handleRemoveFromCart}
              aria-label={`Remove one ${name} from cart`}
              className="counter-button remove"
            >
              <img 
                src={assets.remove_icon_red} 
                alt="Remove from cart" 
              />
            </button>
            <span 
              className="counter-value" 
              aria-label={`${itemCount} items in cart`}
            >
              {itemCount}
            </span>
            <button 
              onClick={handleAddToCart}
              aria-label={`Add one more ${name} to cart`}
              className="counter-button add"
            >
              <img 
                src={assets.add_icon_green} 
                alt="Add to cart" 
              />
            </button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3 className="food-item-name">{name}</h3>
          <img 
            src={assets.rating_starts} 
            alt="5 star rating" 
            className="rating-stars"
          />
        </div>
      </div>

      <p className="food-item-description">
        {description}
      </p>
      
      <p className="food-item-price">
        ${price.toFixed(2)}
      </p>
    </article>
  );
};

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default memo(FoodItem);
