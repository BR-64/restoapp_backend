import axios from 'axios';

export const handleCheckout = async (
  cart,
  setCart,
  address,
  setReceipt,
  navigate
) => {
  if (!cart || cart.length === 0) {
    alert('Cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Simulate checkout
  alert(
    `✅ Checkout successful!\nTotal: $${total.toFixed(
      2
    )}\nShipping to:\n${address}`
  );

  // api call
  try {
    const res = await axios.post('http://localhost:5000/api/orders', {
      items: cart,
      address,
      total,
    });

    // Set receipt data
    setReceipt({
      address,
      items: cart,
      total,
      timestamp: new Date().toLocaleString(),
    });

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');

    // Navigate to receipt page
    navigate('/receipt');
  } catch (err) {
    console.error(err);
    alert('Failed to place order');
  }
};
