import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // const confirmLogout = window.confirm('Are you sure you want to log out?');

    // if (confirmLogout) {
    //   localStorage.removeItem('token');
    //   navigate('/login');
    // }

    if (window.confirm('Are you sure to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const token = localStorage.getItem('token');
  if (!token) return null; // Don't show button if not logged in

  return (
    <button
      onClick={handleLogout}
      //   className='bg-red-600 text-red px-4 py-2 rounded hover:bg-red-700'
      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-red font-semibold rounded-xl shadow-md transition duration-200'>
      Logout
    </button>
  );
};

export default LogoutButton;
