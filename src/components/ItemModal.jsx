import React from 'react';
import AddToCartBar from './AddToCartBar';

const ItemModal = ({ item, onClose }) => {
  // if (!item) return null;

  return item ? (
    // <div className=' fixed inset-0 bg-black-400 bg-opacity-1 flex justify-center items-center z-50 '>
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative flex flex-col h-[80%] bg-white rounded-lg shadow-2xl max-w-md w-85 sm:w-120 '>
        <img
          className='w-full h-[40vh] object-cover m-auto self-start mt-0 mb-0 rounded-md'
          src={'http://localhost:5000/' + item.file}
          alt=''
        />
        <div className='productinfo flex flex-col h-[30vh] pl-5 pt-3 pr-5 '>
          <h2 className='capitalize text-2xl font-bold mb-2 text-left'>
            {item.name}
          </h2>
          <p className='mb-2 text-left ml-3'>{item.description}</p>
          <p className='font-semibold self-end mt-auto mb-0 text-3xl'>
            {' '}
            &nbsp;฿ {item.price.toLocaleString()}
          </p>
        </div>
        <AddToCartBar product={item} className='self-end' />
        <button
          // className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          className='absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold focus:outline-none'
          onClick={onClose}>
          X
        </button>
      </div>
    </div>
  ) : (
    // <div>hello world</div>
    <div></div>
  );
};

export default ItemModal;
