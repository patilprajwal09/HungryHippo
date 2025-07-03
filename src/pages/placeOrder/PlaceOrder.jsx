import React, { useContext, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount}=useContext(StoreContext)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;
  const isCartEmpty = subtotal === 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    for (const key in form) {
      if (!form[key].trim()) return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCartEmpty) {
      setError('Your cart is empty.');
      return;
    }
    if (!validateForm()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('The order is placed!');
    }, 1200);
  };

  return (
    <form className='place_order' onSubmit={handleSubmit} aria-label="Place your order">
      <div className="place_order_left">
        <p className="title">Delivery Information</p>
        <div className="multi_fields">
          <input name="firstName" type="text" placeholder='First Name' value={form.firstName} onChange={handleChange} aria-label="First Name" required />
          <input name="lastName" type="text" placeholder='Last Name' value={form.lastName} onChange={handleChange} aria-label="Last Name" required />
        </div>
        <input name="email" type="email" placeholder='Email Address' value={form.email} onChange={handleChange} aria-label="Email Address" required />
        <input name="street" type="text" placeholder='Street' value={form.street} onChange={handleChange} aria-label="Street" required />
        <div className="multi_fields">
          <input name="city" type="text" placeholder='City' value={form.city} onChange={handleChange} aria-label="City" required />
          <input name="state" type="text" placeholder='State' value={form.state} onChange={handleChange} aria-label="State" required />
        </div>
        <div className="multi_fields">
          <input name="pincode" type="text" placeholder='Pincode' value={form.pincode} onChange={handleChange} aria-label="Pincode" required />
          <input name="country" type="text" placeholder='Country' value={form.country} onChange={handleChange} aria-label="Country" required />
        </div>
        <input name="phone" type="text" placeholder='Phone' value={form.phone} onChange={handleChange} aria-label="Phone" required />
        {error && <div className="order-error" role="alert">{error}</div>}
      </div>
      <div className="place_order_right">
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
            type="submit"
            disabled={isCartEmpty || loading}
            aria-disabled={isCartEmpty || loading}
            className={isCartEmpty ? 'disabled' : ''}
          >
            {loading ? 'Placing Order...' : 'PROCEED TO PAYMENT'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
