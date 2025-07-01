// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ForgotPassButton from '../components/ForgotPasButton.jsx';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();

      if (response.ok) {
        localStorage.setItem('token', res.token);
        setToken(res.token);

        login(res.token);

        alert('Login successful!');
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
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
        <form onSubmit={handleLogin} className='space-y-4'>
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
              required
            />
          </div>

          <button
            type='submit'
            className='w-full py-2 font-semibold rounded-lg shadow-sm transition duration-200'>
            Login
          </button>
          <ForgotPassButton />
        </form>
      </div>
    </div>
  );
}

export default Login;
