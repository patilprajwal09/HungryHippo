import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleOrderNow = () => {
    // In a real app, this would navigate to the menu or trigger an action
    console.log('Order Now clicked');
  };

  const handleLearnMore = () => {
    // In a real app, this would navigate to about page or show more info
    console.log('Learn More clicked');
  };

  // Remove the imageLoaded/imageError logic if you use a background image via CSS
// Just render the content directly, or use an <img> tag for loading detection

return (
  <header className="header" role="banner">
    <div className="header-overlay" />
    <div className="header-contents">
      <h1 className="header-title">Order Your Favorite Food Here</h1>
      <p className="header-description">...</p>
      <div className="header-actions">
        <button className="header-button primary">Order Now</button>
        <button className="header-button secondary">Learn More</button>
      </div>
    </div>
  </header>
);
  // return (
  //   <header className="header" role="banner">
  //     <div 
  //       className={`header-background ${imageLoaded ? 'loaded' : ''} ${imageError ? 'error' : ''}`}
  //       style={{
  //         backgroundImage: imageError 
  //           ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  //           : 'url("https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800")'
  //       }}
  //       onLoad={handleImageLoad}
  //       onError={handleImageError}
  //       aria-label="Delicious food background"
  //     />
      
  //     {!imageLoaded && !imageError && (
  //       <div className="header-loading">
  //         <div className="loading-spinner"></div>
  //       </div>
  //     )}

  //     <div className="header-overlay" />
      
  //     <div className="header-contents">
  //       <h1 className="header-title">
  //         Order Your Favorite Food Here
  //       </h1>
        
  //       <p className="header-description">
  //         Choose from a diverse menu featuring a delectable array of dishes crafted with
  //         the finest ingredients and culinary expertise. Our mission is to satisfy your 
  //         cravings and elevate your dining experience, one delicious meal at a time.
  //       </p>
        
  //       <div className="header-actions">
  //         <button 
  //           className="header-button primary"
  //           onClick={handleOrderNow}
  //           aria-label="Start ordering food"
  //         >
  //           Order Now
  //         </button>
          
  //         <button 
  //           className="header-button secondary"
  //           onClick={handleLearnMore}
  //           aria-label="Learn more about our services"
  //         >
  //           Learn More
  //         </button>
  //       </div>
  //     </div>
  //   </header>
  // );
};

export default Header;
