import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { handleCheckout } from '../utils/checkout';

export default function CheckoutForm({ onClose }) {
  const { cart, setCart, setReceipt } = useCart();
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert('Please enter a shipping address.');
      return;
    }

    setSubmitted(true);

    // You can extend this to send address to backend here
    handleCheckout(cart, setCart, address, setReceipt, navigate);

    if (onClose) onClose(); // Optional: close modal after checkout
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 border rounded shadow max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>📦 Shipping Info</h2>
      <textarea
        rows={4}
        className='w-full border p-2 rounded mb-4'
        placeholder='Enter your shipping address...'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        type='submit'
        className='w-full bg-green-600 text-green py-2 rounded hover:bg-green-700'>
        Confirm & Checkout
      </button>
    </form>
  );
}
