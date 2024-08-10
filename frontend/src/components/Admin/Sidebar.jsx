

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTie, FaVoteYea, FaSignOutAlt, FaPlusCircle, FaHome, FaQuestionCircle } from 'react-icons/fa';
import adminImage from '../../assets/members/logo3.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Optionally, you can redirect the user to the login page
    navigate('/');
  };

  return (
    <div className="bg-blue-950 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <img src={adminImage} alt="Admin" className="rounded-full w-32 h-32 mb-2" />
        <h2 className="text-xl font-bold">Admin Name</h2>
        <hr className="w-3/4 border-t-2 border-blue-300 mt-2 mb-4" />
      </div>
      <nav className="flex-grow">
        <ul>
          <li className="mb-4">
            <NavLink to="/admin/view-voters" className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              <FaUsers className="mr-2" /> View Voters
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/admin/view-candidates" className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              <FaUserTie className="mr-2" /> View Candidates
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/admin/add-candidates" className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              <FaPlusCircle className="mr-2" /> Add Candidates
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/admin/view-elections" className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              <FaVoteYea className="mr-2" /> View Elections
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/admin/add-elections" className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              <FaPlusCircle className="mr-2" /> Add Elections
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/admin/query" className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors">
              <FaQuestionCircle className="mr-2" /> Query
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-lg py-2 px-4 rounded hover:bg-blue-800 transition-colors w-full text-left"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;




