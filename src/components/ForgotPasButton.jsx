import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/forgotpass');
  };

  return (
    <button
      onClick={handleClick}
      className='w-full py-2 font-semibold rounded-lg shadow-sm transition duration-200'>
      Forgot Password
    </button>
  );
};

export default LogoutButton;
