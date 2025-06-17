import React from 'react';

const ProductCard = ({ img, name, details, price, onClick }) => {
  return (
    <div
      // flex
      // class='sm:w-45 flex flex-col grow w-30 h-70 border border-gray-200 rounded-md items-start shadow-lg text-left'
      // onClick={onClick}>
      // grid
      class=' flex flex-col border border-gray-200 h-70 sm:h-80 rounded-md items-start shadow-lg text-left'
      onClick={onClick}>
      <img
        className=' w-full h-40 object-cover rounded '
        src={'http://localhost:5000/' + img}
        alt=''
      />
      <p className='text-lg leading font-semibold ml-2 mt-1 capitalize'>
        {name}
      </p>
      <p className='text-left text-sm ml-4  line-clamp-3'>{details}</p>
      <p className='self-end mt-auto mr-2 mb-1'> &nbsp;฿ {price}</p>
    </div>
  );
};

export default ProductCard;
