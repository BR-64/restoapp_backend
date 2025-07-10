import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ReceiptPage() {
  const { receipt } = useCart();

  if (!receipt) {
    return (
      <div className='p-6 text-center'>
        <p>No receipt found.</p>
        <Link to='/' className='text-blue-600 underline'>
          Go to Home
        </Link>
      </div>
    );
  }

  const { items, address, total, timestamp } = receipt;

  return (
    <div className='p-6 max-w-2xl mx-auto border rounded shadow'>
      <h2 className='text-2xl font-bold mb-4'>🧾 Receipt</h2>

      <p className='mb-2 text-sm text-gray-500'>Order Time: {timestamp}</p>
      <h3 className='font-semibold mb-1'>Shipping Address:</h3>
      <p className='mb-4 whitespace-pre-line'>{address}</p>

      <div className='mb-4'>
        <h3 className='font-semibold mb-2'>Items:</h3>
        <ul className='space-y-1'>
          {items.map((item) => (
            <li key={item._id}>
              {item.name} × {item.quantity} — ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className='font-bold text-lg border-t pt-2 mb-4'>
        Total: ${total.toFixed(2)}
      </div>

      <Link
        to='/'
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
        Back to Home
      </Link>
    </div>
  );
}
