



import React, { useState, useEffect } from 'react';
import VoterCard from './VoterCard';

const MaleVoters = () => {
  const [maleVoters, setMaleVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaleVoters = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/auth/users',
          {
            headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
          }
        ); // Adjust API endpoint as needed
        const data = await response.json();

        
        
        // Filter only male users
        const males = data.filter(user => user.gender === 'male');
        
        setMaleVoters(males);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaleVoters();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-8">Error: {error}</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {maleVoters.map((voter, index) => (
        <VoterCard key={index} voter={voter} />
      ))}
    </div>
  );
};

export default MaleVoters;
