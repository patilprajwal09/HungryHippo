import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './carouselitem.css';

const CarouselItem = ({ menu_name, menu_image, category, setCategory }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    setCategory(category === menu_name ? "All" : menu_name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const isActive = category === menu_name;

  return (
    <div 
      className={`carousel-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${menu_name} category${isActive ? ' (selected)' : ''}`}
      aria-pressed={isActive}
    >
      <div className="carousel-item-image-container">
        {!imageLoaded && (
          <div className="image-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        <img 
          className={`carousel-item-image ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`}
          src={imageLoaded && imageError ? '/placeholder-food.jpg' : menu_image}
          alt={imageError ? `${menu_name} - Image not available` : `${menu_name} category`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {imageError && (
          <div className="image-fallback">
            <span>🍽️</span>
          </div>
        )}
      </div>

      <span className="carousel-item-name">{menu_name}</span>
    </div>
  );
};

CarouselItem.propTypes = {
  menu_name: PropTypes.string.isRequired,
  menu_image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default CarouselItem;
