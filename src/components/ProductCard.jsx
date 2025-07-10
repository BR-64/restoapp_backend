import React from 'react';

import { useCart } from '../context/CartContext';
import AddToCartBar from '../components/AddToCartBar';

const ProductCard = ({
  img,
  name,
  details,
  price,
  pid,
  onClick,
  onAddToCart,
}) => {
  // const { addToCart } = useCart();
  // console.log('Product:', pid);
  // console.log('onAddToCart is a function?', typeof onAddToCart === 'function');

  return (
    <div
      // flex
      // class='sm:w-45 flex flex-col grow w-30 h-70 border border-gray-200 rounded-md items-start shadow-lg text-left'
      // onClick={onClick}>

      // grid
      class=' flex flex-col border border-gray-200 h-70 sm:h-80 rounded-md items-start shadow-lg text-left'>
      <img
        className=' w-full h-40 object-cover rounded '
        src={'http://localhost:5000/' + img}
        alt=''
        onClick={onClick}
      />
      <p className='text-lg leading font-semibold ml-2 mt-1 capitalize'>
        {name}
      </p>
      <p className='text-left text-sm ml-4  line-clamp-3'>{details}</p>
      <p className='self-end mt-auto mr-2 mb-1'> &nbsp;฿ {price}</p>
      {/* <p>{pid}</p> */}
      {/* <button
        onClick={() => onAddToCart(pid)}
        className='bg-blue-600 text-green px-4 py-2 rounded hover:bg-blue-700'>
        Add to Cart
      </button> */}
      <AddToCartBar product={pid} className='self-end' />
    </div>
  );
};

export default ProductCard;
