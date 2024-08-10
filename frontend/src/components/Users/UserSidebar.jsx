


import React from 'react';
import { FaIdCard, FaUser, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';

const UserSidebar = ({ user }) => {
  const formattedDob = new Date(user.dob).toISOString().split('T')[0];
  
  return (
    <div className="w-full md:w-1/4 h-auto bg-white p-4 rounded-lg shadow-md bg-gradient-to-b from-pink-100 via-green-100 to-blue-100">
      <img 
        src={user.image} 
        alt={user.name} 
        className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-blue-300 transition-transform transform hover:scale-105" 
      />
      <h2 className="text-center text-xl md:text-2xl font-bold mb-4">{user.name}</h2>
      <hr className="my-4 border-t-2 border-blue-950" />
      <div className="flex items-center mb-2 hover:bg-blue-200 p-2 rounded cursor-pointer transform transition-transform hover:scale-105">
        <FaIdCard className="text-blue-500 mr-2 text-lg md:text-xl" />
        <p className="text-sm md:text-base"><strong>Aadhar Card:</strong> {user.aadharCardId}</p>
      </div>
      <div className="flex items-center mb-2 hover:bg-blue-200 p-2 rounded cursor-pointer transform transition-transform hover:scale-105">
        <FaUser className="text-blue-500 mr-2 text-lg md:text-xl" />
        <p className="text-sm md:text-base"><strong>Voter ID:</strong> {user.voterIdCard}</p>
      </div>
      <div className="flex items-center mb-2 hover:bg-blue-200 p-2 rounded cursor-pointer transform transition-transform hover:scale-105">
        <FaEnvelope className="text-blue-500 mr-2 text-lg md:text-xl" />
        <p className="text-sm md:text-base"><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="flex items-center mb-2 hover:bg-blue-200 p-2 rounded cursor-pointer transform transition-transform hover:scale-105">
        <FaBirthdayCake className="text-blue-500 mr-2 text-lg md:text-xl" />
        <p className="text-sm md:text-base"><strong>Date of Birth:</strong> {formattedDob}</p>
      </div>
    </div>
  );
};

export default UserSidebar;
