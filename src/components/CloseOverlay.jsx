import React from 'react';
import AddToCartBar from './AddToCartBar';

const CloseOverlay = ({ item, onClose }) => {
  // if (!item) return null;

  return (
    <button
      onClick={onClose}
      className='relative top-2 right-2 text-gray-500 hover:text-black text-xl font-bold focus:outline-none'
      aria-label='X'>
      &times;
    </button>
  );
};

export default CloseOverlay;
