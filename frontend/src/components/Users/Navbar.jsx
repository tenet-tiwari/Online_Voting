









import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the home page
    navigate('/');
  };

  return (
    <nav className="bg-blue-950 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-md">
      <div className="flex items-center mb-4 md:mb-0">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Election_Commission_of_India_logo_%281%29.svg/326px-Election_Commission_of_India_logo_%281%29.svg.png?20240331070608" 
          alt="Logo" 
          className="h-8 w-8 mr-2" 
        />
        <span className="font-bold text-lg">ECI</span>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <Link 
          to="/how-to-vote" 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2 hover:bg-blue-600 transition"
        >
          How to Vote
        </Link>
        <Link 
          to="/users/edit-profile" 
          className="bg-green-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2 hover:bg-green-600 transition"
        >
          Edit Profile
        </Link>
        <Link 
          to="/users/upcoming-elections" 
          className="bg-yellow-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2 hover:bg-yellow-600 transition"
        >
          Upcoming Elections
        </Link>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
