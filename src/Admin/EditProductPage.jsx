import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct((prev) => ({
          ...prev,
          ...res.data,
        }));
      })
      .catch(() => setError('Failed to load product'));
  }, [id]);

  //   const handleChange = (e) => {
  //     const { name, value, type, checked, files } = e.target;
  //     if (type === 'file') {
  //       setProduct((prev) => ({ ...prev, [name]: files[0] }));
  //     } else {
  //       setProduct((prev) => ({
  //         ...prev,
  //         [name]: type === 'checkbox' ? checked : value,
  //       }));
  //     }
  //   };

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(product);
  };

  const handleSubmit = async (e) => {
    const confirmed = window.confirm(
      'Are you sure you want to edit this product?'
    );
    // const formData = new FormData();

    // Append fields to form data
    // for (const key in product) {
    //   if (product[key] !== null) {
    //     formData.append(key, product[key]);
    //     console.log('this is formdata', formData);
    //   }
    // }
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product, {
        headers: {
          'Content-Type': 'application/json',

          //   'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated!');
      navigate('/');
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <div className='relative productform text-left flex-col bg-gray-100 w-full text-black items-center justify-center p-4'>
      {/* <h2 className='text-red-500'>add new product</h2> */}
      <table className='table-auto border-separate border-spacing-2 items-center'>
        <thead>Edit Product</thead>
        <tbody>
          <tr>
            <td>Name :</td>
            <td>
              <input
                type='text'
                name='name'
                value={product.name}
                onChange={handleChange}
                placeholder='Name'
                className='border-1 border-gray-400 h-10 items-center p-3 rounded-sm'
                required
              />
            </td>
          </tr>
          <tr>
            <td>Price : </td>
            <td>
              {' '}
              <input
                type='number'
                name='price'
                value={product.price}
                onChange={handleChange}
                placeholder='Price'
                className='border-1 border-gray-400 h-10 items-center p-3 rounded-sm'
                required
              />
            </td>
          </tr>
          <tr>
            <td>Category : </td>
            <td>
              {' '}
              <textarea
                name='category'
                value={product.category}
                onChange={handleChange}
                placeholder='Description'
                className='border-1 border-gray-400 h-10 items-center p-3 rounded-sm'
              />
            </td>
          </tr>
          <tr>
            <td className='self-top'>Details : </td>
            <td>
              {' '}
              <textarea
                name='description'
                value={product.description}
                onChange={handleChange}
                placeholder='Description'
                className='border-1 border-gray-400 h-30 w-64 p-3 rounded-sm '
              />
            </td>
          </tr>
          <tr>
            <td>Upload Picture : </td>
            <td>
              {/* <input
            type='file'
            multiple={true}
            name='file'
            onChange={handleChangeFile}
            className='border-1 border-gray-400 h-10 w-64 p-3 rounded-sm'
          /> */}
            </td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className='border-2 bg-green-400 h-10 items-center mt-4 rounded-sm text-black ml-auto'>
        Submit
      </button>
      <BackButton />
    </div>
  );
};

export default EditProduct;
