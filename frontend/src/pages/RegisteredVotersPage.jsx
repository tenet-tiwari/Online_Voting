import React from 'react';
import MaleVoters from '../components/Admin/MaleVoters';
import FemaleVoters from '../components/Admin/FemaleVoters';

const RegisteredVotersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
        Registered Voters
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-6 flex justify-center">Male Voters</h2>
          <MaleVoters />
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-6 flex justify-center">Female Voters</h2>
          <FemaleVoters />
        </div>
      </div>
    </div>
  );
};

export default RegisteredVotersPage;
