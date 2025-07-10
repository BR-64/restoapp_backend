import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { handleCheckout } from '../utils/checkout';
import CheckoutForm from '../components/CheckOutForm';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, setCart, getTotal } = useCart();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='p-4 border rounded shadow-md w-full max-w-lg mx-auto'>
      <h2 className='text-xl font-bold mb-4'>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className='text-gray-500'>Cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className='flex justify-between items-center mb-3'>
            <div>
              <h4 className='font-semibold'>{item.name}</h4>
              <p>
                &nbsp;฿{item.price} × {item.quantity}
              </p>
              <p className='text-sm text-gray-500'>
                Total: &nbsp;฿{item.price * item.quantity}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className='px-2 bg-gray-300 rounded'>
                -
              </button>
              <button
                onClick={() => updateQuantity(item._id, 1)}
                className='px-2 bg-gray-300 rounded'>
                +
              </button>
              <button
                onClick={() => removeFromCart(item._id)}
                className='px-2 bg-red-500 text-red rounded'>
                x
              </button>
            </div>
          </div>
        ))
      )}

      {/* Total and checkout button */}
      <hr className='my-4' />
      <div className='flex justify-between font-bold mb-4'>
        <span>Total:</span>
        <span>&nbsp;฿ {getTotal().toLocaleString(2)}</span>
      </div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className='w-full mb-4 bg-green-600 text-green py-2 rounded hover:bg-green-700'>
          Proceed to Checkout
        </button>
      )}
      {showForm && <CheckoutForm />}
    </div>
  );
}
