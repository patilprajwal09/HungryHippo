import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    // In a real app, these would open actual social media profiles
    console.log(`Opening ${platform} profile`);
  };

  const handleNavigation = (page) => {
    // In a real app, these would navigate to actual pages
    console.log(`Navigating to ${page}`);
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="comp-name">
            <h2>Hungry Hippo</h2>
          </div>

          <p className="footer-description">
            Discover delicious meals delivered right to your doorstep. 
            We bring you the finest selection of fresh, quality ingredients 
            prepared by expert chefs. Your satisfaction is our top priority.
          </p>

          <div className="footer-social-icons">
            <button 
              onClick={() => handleSocialClick('Facebook')}
              aria-label="Visit our Facebook page"
              className="social-icon-button"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </button>
            <button 
              onClick={() => handleSocialClick('Twitter')}
              aria-label="Visit our Twitter page"
              className="social-icon-button"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </button>
            <button 
              onClick={() => handleSocialClick('LinkedIn')}
              aria-label="Visit our LinkedIn page"
              className="social-icon-button"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </button>
          </div>
        </div>

        <nav className="footer-content-center" aria-label="Company navigation">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <button 
                onClick={() => handleNavigation('Home')}
                className="footer-link"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('About Us')}
                className="footer-link"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('Delivery')}
                className="footer-link"
              >
                Delivery
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('Privacy Policy')}
                className="footer-link"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </nav>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>
              <a 
                href="tel:+1-212-456-7890" 
                className="footer-contact-link"
                aria-label="Call us at +1-212-456-7890"
              >
                +1-212-456-7890
              </a>
            </li>
            <li>
              <a 
                href="mailto:contact@hungryhippo.com" 
                className="footer-contact-link"
                aria-label="Email us at contact@hungryhippo.com"
              >
                contact@hungryhippo.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copyright">
        Copyright © {currentYear} HungryHippo.com - All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer;
