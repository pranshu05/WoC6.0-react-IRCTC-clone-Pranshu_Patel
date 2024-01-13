import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='fixed left-0 top-0 h-full w-full'>
      <div className='flex flex-col items-center justify-center h-full text-center content-center'>
        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">Login</h2>
        <input className='bg-transparent border border-gray-500 my-2 rounded-lg p-2' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className='bg-transparent border border-gray-500 my-2 rounded-lg p-2' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className='bg-black bg-opacity-5 hover:bg-opacity-10 backdrop backdrop-blur-sm border border-gray-500 my-2 rounded-lg p-2' onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link className='text-blue-500' to="/signup">Sign Up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
