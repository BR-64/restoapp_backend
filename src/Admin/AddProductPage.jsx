import React, { useState } from 'react';
import addProduct from '../api/AddProduct';
import BackButton from '../components/BackButton';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    file: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log(formData);
  };

  const handleChangeFile = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files,
    }));
  };

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to add this product?'
    );
    if (!confirmed) return;

    try {
      await addProduct(formData);
      console.log('product created');
    } catch (err) {
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className='relative productform text-left flex-col bg-gray-100 w-full text-black items-center justify-center p-4'>
      {/* <h2 className='text-red-500'>add new product</h2> */}
      <table className='table-auto border-separate border-spacing-2 items-center'>
        <thead>Add New Product</thead>
        <tbody>
          <tr>
            <td>Name :</td>
            <td>
              <input
                type='text'
                onChange={handleChange}
                name='name'
                placeholder='product name'
                className='border-1 border-gray-400 h-10 items-center p-3 rounded-sm'
              />
            </td>
          </tr>
          <tr>
            <td>Price : </td>
            <td>
              {' '}
              <input
                type='number'
                onChange={handleChange}
                name='price'
                placeholder='price'
                className='border-1 border-gray-400 h-10 items-center p-3 rounded-sm'
              />
            </td>
          </tr>
          <tr>
            <td>Category : </td>
            <td>
              {' '}
              <input
                type='text'
                onChange={handleChange}
                name='category'
                placeholder='category'
                className='border-1 border-gray-400 h-10 items-center p-3 rounded-sm'
              />
            </td>
          </tr>
          <tr>
            <td className='self-top'>Details : </td>
            <td>
              {' '}
              <textarea
                onChange={handleChange}
                row='3'
                name='description'
                placeholder='product description'
                className='border-1 border-gray-400 h-30 w-64 p-3 rounded-sm '
              />
            </td>
          </tr>
          <tr>
            <td>Upload Picture : </td>
            <td>
              <input
                type='file'
                multiple={true}
                name='file'
                onChange={handleChangeFile}
                className='border-1 border-gray-400 h-10 w-64 p-3 rounded-sm'
              />
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

export default AddProductForm;
