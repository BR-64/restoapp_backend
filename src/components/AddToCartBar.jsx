import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const AddToCartBar = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const decrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increase = () => {
    setQuantity((q) => q + 1);
  };

  const handleClick = () => {
    addToCart(product);
    // if (onAdded) onAdded()
  };
  return (
    // <div className='mt-auto w-full h-15 bg-green-300'>add to cart bar</div>
    <div class='flex items-center border rounded overflow-hidden mt-auto w-full h-15 pl-5'>
      <button
        class='px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200'
        onClick={decrease}>
        -
      </button>
      <span className='px-3'>{quantity}</span>
      <button
        class='px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200'
        onClick={increase}>
        +
      </button>
      <button
        class='bg-blue-600 text-black px-6 py-2 rounded-lg  transition m-auto'
        onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartBar;
