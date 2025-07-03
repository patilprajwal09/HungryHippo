import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalCartAmount } = useContext(StoreContext);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would trigger search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const cartAmount = getTotalCartAmount();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <a href="#header" className="project-name" aria-label="Hungry Hippo Home">
            <h2>Hungry Hippo</h2>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`} ref={mobileMenuRef}>
          <li className={isActiveRoute('/') ? 'active' : ''}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          
          <li className={location.hash === '#food_display' ? 'active' : ''}>
            <a 
              href="#food-display" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </a>
          </li>
          
          <li className={location.hash === '#footer' ? 'active' : ''}>
            <a 
              href="#footer" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="navbar-right">
          {/* Search */}
          <div className="search-container">
            <button
              className="search-toggle"
              onClick={handleSearchToggle}
              aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              aria-expanded={isSearchOpen}
            >
              <img src={assets.search_icon} alt="Search" />
            </button>
            
            {isSearchOpen && (
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search for food"
                />
                <button type="submit" aria-label="Submit search">
                  <img src={assets.search_icon} alt="Search" />
                </button>
              </form>
            )}
          </div>

          {/* Cart */}
          <div className="navbar-cart">
            <Link to="/cart" aria-label="View cart">
              <img src={assets.basket_icon} alt="Shopping cart" />
              {cartAmount > 0 && (
                <div className="cart-badge" aria-label={`${cartAmount} items in cart`}>
                  {cartAmount}
                </div>
              )}
            </Link>
          </div>

          {/* Sign In Button */}
          <button 
            className="signin-button"
            onClick={() => setShowLogin(true)}
            aria-label="Sign in to your account"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
