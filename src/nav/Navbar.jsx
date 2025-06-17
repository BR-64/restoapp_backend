// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      id='reportNav'
      //   className='bg-gray-800 p-4 text-white flex justify-between items-center shadow-md '>
      className='flex items-center justify-between bg-gray-100 text-white p-4 '>
      <div class=' flex space-x-8'>
        <Link to='/' className='hover:text-gray-300'>
          Home
        </Link>
        <Link to='/admin' className='hover:text-gray-300'>
          Admin Page
        </Link>
        <Link to='/products' className='hover:text-gray-300'>
          Product List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
