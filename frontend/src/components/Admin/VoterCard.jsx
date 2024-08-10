import React from 'react';

const VoterCard = ({ voter }) => {
  const formattedDob = new Date(voter.dob).toISOString().split('T')[0];
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl">
      <img src={voter.image} alt={voter.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold text-center mb-2">{voter.name}</h3>
      <p className="text-center mb-2">Voter ID: {voter.voterIdCard}</p>
      <p className="text-center mb-2">Aadhar Card: {voter.aadharCardId}</p>
      <p className="text-center mb-2">Email: {voter.email}</p>
      <p className="text-center">Date of Birth: {formattedDob}</p>
    </div>
  );
};

export default VoterCard;
