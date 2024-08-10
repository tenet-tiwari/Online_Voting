

import React from 'react';

const CandidateCard = ({ candidate, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${candidate.candidateName}?`)) {
      onDelete(candidate._id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
      <img src={candidate.candidateImage} alt={candidate.candidateName} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold text-center mb-2">{candidate.candidateName}</h3>
      <div className="flex items-center justify-center mb-4">
        <img src={candidate.partyLogo} alt={candidate.partyName} className="w-24 h-auto mr-2" />
        <span className="text-lg">{candidate.partyName}</span>
      </div>
      <div className="flex justify-around">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Update</button>
        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default CandidateCard;
