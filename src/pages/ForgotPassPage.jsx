import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true); // Start spinner

    console.log('mail sending');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/forgot-password',
        { email }
      );
      setMessage(res.data.message);
      setSent(true); // 🧠 disable button now

      console.log(loading, sent);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className='max-w-sm mx-auto mt-10 p-6 border rounded shadow'>
      <h2 className='text-xl font-bold mb-4'>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full mb-3 p-2 border rounded'
        />
        <button
          type='submit'
          disabled={loading || sent}
          // className='w-full bg-blue-600 text-black p-2 rounded hover:bg-blue-700'
          className={`w-full p-2 rounded text-black ${
            sent ? 'bg-gray-400 cursor-not-allowed text-white' : ''
            // : 'bg-blue-600 hover:bg-blue-700'
          }`}>
          Send Reset Link
        </button>
      </form>
      {message && <p className='text-green-600 mt-3'>{message}</p>}
      {error && <p className='text-red-600 mt-3'>{error}</p>}
      {loading && <p className='text-sm text-gray-500 mt-2'>⌛ Sending...</p>}
    </div>
  );
};

export default ForgotPassword;
