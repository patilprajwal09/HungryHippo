import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { Navigate, useNavigate } from 'react-router-dom';

const Cart = () => {

  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    isLoading,
    error,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  // Get cart items as an array for easier mapping
  const cartItemEntries = food_list.filter(item => cartItems[item._id] > 0);
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;
  const isCartEmpty = cartItemEntries.length === 0;

  return (
    <div className='cart'>
      <div className="cart_items" aria-live="polite">
        <div className="cart_items_title" role="row">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {isLoading && (
          <div className="cart-loading">
            <div className="loading-spinner" />
            <p>Updating cart...</p>
          </div>
        )}
        {error && (
          <div className="cart-error" role="alert">
            {error}
          </div>
        )}
        {isCartEmpty && !isLoading && !error && (
          <div className="cart-empty" role="status">
            <p>Your cart is empty. Add some delicious food!</p>
          </div>
        )}
        {cartItemEntries.map((item) => (
          <div key={item._id}>
            <div className="cart_items_title cart_items_item" role="row">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>${item.price * cartItems[item._id]}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className='cart-remove-btn'
                aria-label={`Remove one ${item.name} from cart`}
                disabled={isLoading}
              >
                ×
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="cart_bottom">
        <div className="cart_total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button
            onClick={() => navigate('/order')}
            disabled={isCartEmpty || isLoading}
            className={isCartEmpty ? 'disabled' : ''}
            aria-disabled={isCartEmpty || isLoading}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart_promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart_promocode_input'>
              <input type="text" placeholder='promo code' aria-label="Promo code" />
              <button disabled>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
