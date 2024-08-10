

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewElections = () => {
  const [electionsData, setElectionsData] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchElections = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/election');
        const data = await response.json();
        setElectionsData(data);
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    };

    fetchElections();
  }, []);

  const handleViewDetails = (id) => {
    navigateTo(`/admin/election/${id}`);
  };

  const handleDelete = async (id,name) => {
    try {
      // Send a DELETE request to the backend to delete the election
      if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const response = await fetch(`https://online-voting-ulpa.onrender.com/api/election/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the election');
      }

      // Update the UI by removing the deleted election from state
      setElectionsData(electionsData.filter((election) => election._id !== id));
    }} catch (error) {
      console.error('Failed to delete the election:', error);
    }
  };
  
  return ( 
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
        Elections
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {electionsData.map((election) => (
          
          <div
            key={election._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold mb-2">{election.name}</h2>
            <p className="text-gray-600 mb-2">{new Date(election.date).toISOString().split('T')[0]}</p>
            {/* <p className="text-gray-600 mb-4">{election.location}</p> */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleViewDetails(election._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => handleDelete(election._id,election.name)}
                className="bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewElections;
