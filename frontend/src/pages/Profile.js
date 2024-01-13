import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(token)

        if (response.ok) {
          const user = await response.json();
          setUsername(user.username);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <div className='flex flex-col items-center justify-center h-full text-center content-center'>
        <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-white">Profile Page</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Welcome, {username}!</p>
            <button onClick={handleSignOut} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
