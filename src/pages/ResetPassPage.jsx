import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className='max-w-sm mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          placeholder='New password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full mb-3 p-2 border rounded'
        />
        <input
          type='password'
          placeholder='Confirm new password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='w-full mb-3 p-2 border rounded'
        />
        <button
          type='submit'
          className='w-full bg-green-600 text-black p-2 rounded hover:bg-green-700'>
          Reset Password
        </button>
      </form>
      {message && <p className='text-green-600 mt-3'>{message}</p>}
      {error && <p className='text-red-600 mt-3'>{error}</p>}
    </div>
  );
};

export default ResetPassword;
