
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center mb-4 sm:mb-0">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Election_Commission_of_India_logo_%281%29.svg/326px-Election_Commission_of_India_logo_%281%29.svg.png?20240331070608" 
          alt="Organization Logo" 
          className="h-10 w-10 sm:h-12 sm:w-12" 
        />
        <span className="ml-2 text-white text-xl sm:text-2xl">ECI</span>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <Link 
          to="/how-to-vote" 
          className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center">
          How to Vote
        </Link>
        <Link 
          to="/login" 
          className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
          Login
        </Link>
        <Link 
          to="/register" 
          className="text-white bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 text-center">
          Register
        </Link>
        <a 
          href="#contact" 
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-center">
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
