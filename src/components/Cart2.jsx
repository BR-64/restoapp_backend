import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className='p-4 border rounded shadow-md w-full max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className='text-gray-500'>Cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className='flex justify-between items-center mb-3'>
            <div>
              <h4 className='font-semibold'>{item.name}</h4>
              <p>
                ${item.price} × {item.quantity}
              </p>
              <p className='text-sm text-gray-500'>
                Total: ${item.price * item.quantity}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <p>h3llo</p>
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className='px-2 bg-gray-300 rounded'>
                -
              </button>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className='px-2 bg-gray-300 rounded'>
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className='px-2 bg-red-500 text-white rounded'>
                x
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
