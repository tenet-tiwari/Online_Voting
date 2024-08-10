

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VotePage = () => {
  const { id: electionId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteStatus, setVoteStatus] = useState(null);
  const [hasVoted, setHasVoted] = useState(false); // New state to track if the user has voted

  useEffect(() => {
    // Check if the user has already voted for this election
    const voted = localStorage.getItem(`hasVoted_${electionId}`);
    if (voted) {
      setHasVoted(true);
    }

    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidate');
        const allCandidates = response.data;
        const filteredCandidates = allCandidates.filter(
          (candidate) => candidate.election && candidate.election._id === electionId
        );
        setCandidates(filteredCandidates);
      } catch (err) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [electionId]);

  const handleVote = async (candidateId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/vote/cast',
        {
          electionId,
          candidateId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVoteStatus('Vote submitted successfully');
      setHasVoted(true);
      // Store the voting status in localStorage
      localStorage.setItem(`hasVoted_${electionId}`, 'true');
    } catch (err) {
      setVoteStatus('Error submitting vote as you have already voted');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
        Vote for Election
      </h1>
      {voteStatus && (
        <div
          className={`text-center text-lg font-bold mb-6 ${
            voteStatus.includes('Error') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {voteStatus}
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Election EVM</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <img
                  src={candidate.candidateImage}
                  alt={candidate.candidateName}
                  className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{candidate.candidateName}</h3>
                  <div className="flex items-center mt-2">
                    <img
                      src={candidate.partyLogo}
                      alt={candidate.partyName}
                      className="w-12 h-12 mr-2"
                    />
                    <p>{candidate.partyName}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleVote(candidate._id)}
                className={`${
                  hasVoted
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white px-4 py-2 mt-8 rounded transition-colors duration-300 w-full`}
                disabled={hasVoted} // Disable the button if the user has voted
              >
                {hasVoted ? 'Vote Casted' : 'Vote'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotePage;
