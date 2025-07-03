import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeals } from '../../assets/topMeals';
import CarouselItem from './CarouselItem';
import './multipleItemCarousel.css';

const MultipleItemCarousel = ({ category, setCategory }) => {
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  // Responsive carousel settings
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    
    // Simulate loading time for images
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
      clearTimeout(timer);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="carousel-loading">
        <div className="loading-spinner"></div>
        <p>Loading menu categories...</p>
      </div>
    );
  }

  return (
    <section className="carousel-section" aria-label="Menu categories carousel">
      <div className="carousel-container">
        <div className="menu-header" id="menu">
          <h1>Explore our menu</h1>
          <p className="menu-text">
            Choose from a diverse menu featuring a delectable array of dishes.
            Our mission is to satisfy your cravings and elevate your dining experience, 
            one delicious meal at a time.
          </p>
        </div>

        <div className="carousel-wrapper">
          <Slider {...settings}>
            {topMeals.map((item) => (
              <CarouselItem
                key={item.menu_name} 
                menu_image={item.menu_image}
                menu_name={item.menu_name}
                category={category} 
                setCategory={setCategory} 
              />
            ))}
          </Slider>
        </div>
      </div>

      <hr className="section-divider" />
    </section>
  );
};

MultipleItemCarousel.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default MultipleItemCarousel;
