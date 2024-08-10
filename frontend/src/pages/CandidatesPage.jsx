

import React, { useState, useEffect } from 'react';
import CandidateCard from '../components/Admin/CandidateCard';

const CandidatesPage = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedElection, setSelectedElection] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all elections and candidates data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const electionResponse = await fetch('https://online-voting-ulpa.onrender.com/api/election');
        const candidateResponse = await fetch('https://online-voting-ulpa.onrender.com/api/candidate');

        if (!electionResponse.ok || !candidateResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const electionData = await electionResponse.json();
        const candidateData = await candidateResponse.json();

        setElections(electionData);
        setCandidates(candidateData);

        // Set default selection if elections exist
        if (electionData.length > 0) {
          setSelectedElection(electionData[0]._id);
        }

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter candidates based on the selected election
  useEffect(() => {
    if (selectedElection && candidates.length > 0) {
      const filtered = candidates.filter(candidate => candidate.election && candidate.election._id === selectedElection);
      setFilteredCandidates(filtered);
    }
  }, [selectedElection, candidates]);

  const handleElectionChange = (event) => {
    setSelectedElection(event.target.value);
  };

  const handleDeleteCandidate = async (candidateId) => {
    try {
      const response = await fetch(`https://online-voting-ulpa.onrender.com/api/candidate/${candidateId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete candidate');
      }

      // Remove the deleted candidate from state
      setFilteredCandidates(filteredCandidates.filter(candidate => candidate._id !== candidateId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
        Candidates
      </h1>
      <div className="mb-6">
        <label htmlFor="election" className="block text-lg font-semibold mb-2">Select Election</label>
        <select
          id="election"
          value={selectedElection}
          onChange={handleElectionChange}
          className="w-full p-2 border border-gray-300 rounded bg-gradient-to-r from-blue-100 via-blue-100 to-blue-50"
        >
          {elections.map((election) => (
            <option key={election._id} value={election._id}>{election.name}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCandidates.map((candidate) => (
          <CandidateCard key={candidate._id} candidate={candidate} onDelete={handleDeleteCandidate} />
        ))}
      </div>
    </div>
  );
};

export default CandidatesPage;
