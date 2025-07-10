import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className='p-4 border rounded shadow-md w-full max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className='text-gray-600'>Your cart is empty.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow'>
            <thead>
              <tr className='bg-gray-100 text-left'>
                <th className='p-3'>Pic</th>
                <th className='p-3'>Product</th>
                <th className='p-3 text-center'>Action</th>
                <th className='p-3'>Price</th>
                <th className='p-3'>Quantity</th>
                <th className='p-3'>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className='border-t'>
                  <td className='p-3'>
                    <img src={'http://localhost:5000/' + item.file} />
                  </td>
                  <td className='p-3'>{item.name}</td>
                  <td className='p-3 text-center'>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='text-red-500 hover:text-red-700'>
                      <Trash2 size={18} />
                    </button>
                  </td>
                  <td className='p-3'>&nbsp;฿{item.price.toFixed(2)}</td>
                  <td className='p-3'>
                    <input
                      type='number'
                      min='1'
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className='w-16 border rounded px-2 py-1'
                    />
                  </td>
                  <td className='p-3'>
                    &nbsp;฿{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className='bg-gray-100 font-bold'>
                <td className='p-3' colSpan='3'>
                  Total
                </td>
                {/* <td className='p-3'>${total.toFixed(2)}</td> */}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
