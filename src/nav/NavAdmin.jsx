// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavAdmin = () => {
  const navigate = useNavigate();

  return (
    <nav className='flex-1 p-4 space-y-2' id='NavAdmin'>
      <p></p>
      <Link to='/addproduct' className='hover:text-gray-300'>
        Add product
      </Link>
      <p>Orders</p>
      <p>Products</p>
      <p>Members</p>
    </nav>
  );
};

export default NavAdmin;
