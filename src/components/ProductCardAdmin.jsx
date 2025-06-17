import React from 'react';
import { Link } from 'react-router-dom';

const ProductCardAdmin = ({
  id,
  img,
  name,
  details,
  category,
  price,
  onClick,
}) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        onDelete(item._id); // Update UI
      } else {
        console.error('Delete failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div
      class='max-w-160 flex grow w-full border m-1 border-gray-200 rounded-md shadow-sm justify-between text-left '
      onClick={onClick}>
      <img
        className='w-24 h-30 object-cover '
        src={'http://localhost:5000/' + img}
        alt=''
      />
      <p className='  font-semibold'>{name}</p>
      <p className=''>{category}</p>
      <p className=''>{price}</p>
      <button className='text-black' onClick={handleDelete}>
        Delete
      </button>

      <Link to={`/edit/${id}`}>
        <button className='text-black'>Edit</button>
      </Link>
    </div>
  );
};

export default ProductCardAdmin;
