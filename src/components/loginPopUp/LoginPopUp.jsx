import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './loginpopup.css';
import { assets } from '../../assets/assets';

const LoginPopUp = ({ setShowLogin }) => {
  const [formMode, setFormMode] = useState("login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus first input when modal opens
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [formMode]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowLogin(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setShowLogin]);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowLogin]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Sign up specific validations
    if (formMode === "signup") {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      console.log('Form submitted:', formData);
      
      // Close modal on success
      setShowLogin(false);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setFormMode(prev => prev === "login" ? "signup" : "login");
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="login-popup" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="login-popup-backdrop" />
      
      <form 
        ref={modalRef}
        className="login-popup-container" 
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="login-popup-title">
          <h2 id="modal-title">
            {formMode === "signup" ? "Create Account" : "Welcome Back"}
          </h2>
          
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="close-button"
            aria-label="Close login modal"
          >
            <img src={assets.cross_icon} alt="Close" />
          </button>
        </div>

        {errors.general && (
          <div className="error-message general">
            {errors.general}
          </div>
        )}

        <div className="login-popup-inputs">
          {formMode === "signup" && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                ref={firstInputRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message">
                  {errors.name}
                </span>
              )}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              ref={formMode === "login" ? firstInputRef : null}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="error-message">
                {errors.password}
              </span>
            )}
          </div>

          {formMode === "signup" && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirm-password-error" className="error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="login-popup-condition">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <span className="error-message">{errors.terms}</span>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner" />
          ) : (
            formMode === "signup" ? "Create Account" : "Sign In"
          )}
        </button>

        <div className="login-popup-switch">
          <p>
            {formMode === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              onClick={handleModeSwitch}
              className="switch-button"
            >
              {formMode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {formMode === "login" && (
          <div className="forgot-password">
            <button type="button" className="forgot-link">
              Forgot your password?
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

LoginPopUp.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopUp;
