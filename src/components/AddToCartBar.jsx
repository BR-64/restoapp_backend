import React from 'react';

const AddToCartBar = () => {
  return (
    // <div className='mt-auto w-full h-15 bg-green-300'>add to cart bar</div>
    <div class='flex items-center border rounded overflow-hidden mt-auto w-full h-15 pl-5'>
      <button class='px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200'>
        -
      </button>
      <span class='px-4 py-1'>1</span>
      <button class='px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200'>
        +
      </button>
      <button class='bg-blue-600 text-black px-6 py-2 rounded-lg  transition m-auto'>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartBar;
