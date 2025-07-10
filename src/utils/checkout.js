export const handleCheckout = (
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

  // Simulate checkout (you can replace this with an API call)
  alert(
    `✅ Checkout successful!\nTotal: $${total.toFixed(
      2
    )}\nShipping to:\n${address}`
  );

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
};
