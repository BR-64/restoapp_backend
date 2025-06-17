import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarRes = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to='/' className='hover:text-gray-300'>
              RestoApp
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link to='/login' className='hover:text-gray-300'>
              Login
            </Link>
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

          {/* Mobile menu button */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-600 hover:text-blue-600 focus:outline-none'
              aria-label='Toggle menu'>
              {isOpen ? (
                // X icon to close
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'></path>
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='flex flex-col md:hidden px-4 pb-4 space-y-2'>
          <Link to='/login' className='hover:text-gray-300'>
            Login
          </Link>
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
      )}
    </nav>
  );
};

export default NavbarRes;
