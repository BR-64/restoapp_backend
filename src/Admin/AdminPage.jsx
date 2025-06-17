import React, { useState } from 'react';
import addProduct from '../api/AddProduct';
import AddProductForm from './AddProductPage';
import NavAdmin from '../nav/NavAdmin';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div class=' w-full bg-gray-100 text-black flex flex-col justify-center m-auto'>
      <div class='p-6 text-2xl font-bold border-b border-gray-700 '>
        Admin Page
      </div>
      <Link to='/productsAdmin' className='hover:text-gray-300'>
        Product Management
      </Link>
      <div class='p-4 border-t border-gray-700 text-sm text-gray-400'>
        © 2025 RestoAdminApp
      </div>
    </div>
  );
};

export default AdminPage;
