import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className='absolute bottom-4 right-4 p-3 bg-blue-600 text-black rounded-full shadow-lg hover:bg-blue-700 transition'>
      {' '}
      ← Back
    </button>
  );
};

export default BackButton;
