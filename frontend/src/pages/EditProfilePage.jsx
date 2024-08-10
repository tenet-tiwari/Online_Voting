
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import logo2 from '../assets/users/logo2.jpg';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare form data to be sent
    const data = new FormData();
    data.append('name', formData.name);
    data.append('dob', formData.dob);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.image) data.append('image', formData.image);

    try {
      // Send the data to the backend
      await axios.put('https://online-voting-ulpa.onrender.com/api/edit/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
      });

      // Redirect to the /users page on success
      navigate('/users');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50 p-4">
      <h1 className="text-4xl font-bold text-center mb-3 bg-blue-950 text-white p-3 rounded-2xl">
        Edit Profile
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full h-auto md:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <div className="w-auto md:w-1/2 p-4 flex items-center justify-center">
          <img
            src={logo2}
            alt="Profile"
            className="w-auto h-auto rounded-lg shadow-md transform transition-transform "
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;

