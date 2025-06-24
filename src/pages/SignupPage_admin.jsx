// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setcfmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password !== cfmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    alert('Passwords match');

    console.log('Email is valid : ', email);

    try {
      const response = await fetch('http://localhost:5000/admin/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const res = await response.json();

      if (response.ok) {
        alert('Signup successful!');
        navigate('/');
      } else {
        alert(res.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center mb-6 text-blue-400'>
          Admin Sign up Page
        </h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <input
              type='text'
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
          </div>
          <div>
            <input
              type='email'
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>

          <div>
            {/* <label className='block text-gray-700'>Password</label> */}
            <input
              type='password'
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              minLength={8}
              required
            />
          </div>

          <div>
            {/* <label className='block text-gray-700'>Password</label> */}
            <input
              type='password'
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={cfmPassword}
              onChange={(e) => setcfmPassword(e.target.value)}
              placeholder='Confirm Password'
              minLength={8}
              required
            />
          </div>

          {error && <p className='text-red-500'>{error}</p>}

          <button
            type='submit'
            className='w-full bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition'>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
