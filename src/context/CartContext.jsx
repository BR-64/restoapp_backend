import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        // toast.success(`${product.name} quantity increased!`);
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // toast.success(`${product.name} added to cart!`);
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // toast
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.info(`${product.name} quantity increased.`);
    } else {
      toast.success(`${product.name} added to cart.`);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        // console.log('Item:', item._id, 'Updating:', item._id === id);
        return item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item;
      })
    );
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCart,
        getTotal,
        receipt,
        setReceipt,
      }}>
      {children}
    </CartContext.Provider>
  );
};
