



import React, { useState, useEffect } from 'react';
import UserSidebar from '../components/Users/UserSidebar';
import VotingRights from '../components/Users/VotingRights';
import Navbar from '../components/Users/Navbar';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (!token) {
          throw new Error('No token found');
        }

        // Decode token to get userId (assuming JWT)
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId; // Adjust this based on how your token is structured
         
        // console.log(userId);
        // Fetch all users from the backend
        const response = await axios.get('https://online-voting-ulpa.onrender.com/api/auth', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        });

        // Find the current user based on the decoded userId
        //console.log(response.data);
        const currentUser = response.data.find(user => user._id === userId);
        if (!currentUser) {
          throw new Error('User not found');
        }

        setUser(currentUser); // Set the current user data
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex bg-gradient-to-b from-pink-200 via-red-200 to-red-300">
        {user && <UserSidebar user={user} />}
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4 flex justify-center">
            Welcome back, {user ? user.name : 'User'}!
          </h1>
          <VotingRights />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
