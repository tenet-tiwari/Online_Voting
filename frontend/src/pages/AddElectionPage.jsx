

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../assets/admin/logo4.jpg'; // Replace with your image path
import axios from 'axios';

const AddElectionPage = () => {
  const [electionData, setElectionData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElectionData({ ...electionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get token from local storage

      const response = await axios.post(
        'https://online-voting-ulpa.onrender.com/api/election/add', // Your backend endpoint
        electionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Election added:', response.data);
      navigate('/admin');
    } catch (error) {
      console.error('Error adding election:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-5 mt-0 bg-blue-950 text-white p-4 rounded-2xl">
        Add New Election
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 lg:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Election Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="block text-lg font-semibold mb-2">
                  Election Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={electionData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-lg font-semibold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={electionData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-lg font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={electionData.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-lg font-semibold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={electionData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Add Election
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 flex items-center justify-center mb-0">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={logo1}
              alt="Election"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddElectionPage;
