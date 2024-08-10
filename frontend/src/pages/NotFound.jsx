import React from 'react';
import logo1 from '../assets/extra/logo1.svg';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-purple-100 animate-gradient-x">
      <div className="relative w-96 h-96">
        <img 
          src={logo1} 
          alt="Page Not Found" 
          className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-blue-400"
        />
      </div>
      <div className="text-center text-black p-8 mt-4 rounded-lg bg-opacity-80 max-w-lg mx-auto bg-gradient-to-r from-red-200 via-orange-100 to-yellow-200 animate-gradient-x">
        <h1 className="text-4xl font-bold mb-4 animate-pulse">404 - Page Not Found</h1>
        <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      </div>
      <div className="mt-4">
        <a href="/" className="text-black hover:text-gray-950 hover:underline text-lg font-semibold">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
