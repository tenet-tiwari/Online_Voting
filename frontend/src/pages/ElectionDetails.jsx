
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ElectionDetails = () => {
  const { id } = useParams(); // Get the _id from the route params
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all elections
        const electionsResponse = await fetch('http://localhost:5000/api/election');
        if (!electionsResponse.ok) {
          throw new Error('Failed to fetch elections');
        }
        const electionsData = await electionsResponse.json();
        

        // Fetch all candidates
        const candidatesResponse = await fetch('http://localhost:5000/api/candidate');
        if (!candidatesResponse.ok) {
          throw new Error('Failed to fetch candidates');
        }
        const candidatesData = await candidatesResponse.json();
       
        // Filter the specific election by _id
        const selectedElection = electionsData.find(e => e._id === id);
        if (!selectedElection) {
          throw new Error('Election not found');
        }
        setElection(selectedElection);

        // Filter candidates for the specific election
        //console.log("ayush");
        //const filtered = candidatesData.filter(candidate => candidate.election._id === id);
        const filtered = candidatesData.filter(candidate => candidate.election && candidate.election._id === id);

        setFilteredCandidates(filtered);
       

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-8">Error: {error}</div>;
  }

  if (!election) {
    return <div className="min-h-screen bg-gray-100 p-8">Election not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
        {election.name}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-100 hover:shadow-2xl">
        <p className="text-gray-700 mb-2 text-lg"><strong>Description:</strong> {election.description}</p>
        <p className="text-gray-700 mb-2 text-lg"><strong>Date:</strong> {new Date(election.date).toISOString().split('T')[0]}</p>
        <p className="text-gray-700 mb-4 text-lg"><strong>Location:</strong> {election.location}</p>
        <h2 className="text-2xl font-bold mb-4">Candidates</h2>
        <ul className="list-disc list-inside">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, index) => (
              <li key={index} className="mb-2 text-gray-700 text-lg">
                <strong>{candidate.candidateName}</strong> - {candidate.partyName}
              </li>
            ))
          ) : (
            <p className="text-gray-700 text-lg">No candidates found for this election.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ElectionDetails;
