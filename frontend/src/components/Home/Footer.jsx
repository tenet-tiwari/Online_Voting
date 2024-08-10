

import React, { useState } from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const Footer = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await fetch('http://localhost:5000/api/query/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage('Query submitted successfully!');
      } else {
        setSuccessMessage('Failed to submit query. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      setSuccessMessage('Failed to submit query. Please try again.');
    }
  };

  return (
    <footer className="bg-blue-950 text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-start gap-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl mb-4">About Us</h3>
          <p className="mb-4">The Election Commission of India is an autonomous constitutional authority responsible for administering election processes in India. The body administers elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies in India, and the offices of the President and Vice President in the country.</p>
          <div className="flex justify-center md:justify-start space-x-16 mb-4 animate-pulse">
            <a href="https://x.com/SpokespersonECI" className="text-white"><FaTwitter size={32} /></a>
            <a href="https://www.facebook.com/ECI/" className="text-white"><FaFacebook size={32} /></a>
            <a href="https://www.instagram.com/ecisveep/" className="text-white"><FaInstagram size={32} /></a>
            <a href="https://www.youtube.com/eci" className="text-white"><FaYoutube size={32} /></a>
          </div>
          <address className="text-gray-200">
            Nirvachan Sadan, Ashoka Road, New Delhi 110001
          </address>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-2xl mb-4 flex justify-center">Send Query</h3>
          {successMessage && (
            <div className="mb-4 text-center text-green-500">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: true })}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            {errors.name && <span className="text-black">Name is required</span>}

            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            {errors.email && <span className="text-black">Email is required</span>}

            <textarea
              placeholder="Your Query"
              {...register('query', { required: true })}
              className="w-full p-2 border border-gray-300 rounded text-black"
              rows="4"
            ></textarea>
            {errors.query && <span className="text-black">Query is required</span>}

            <button
              type="submit"
              className="w-full py-2 bg-blue-700 hover:bg-blue-800 rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-200">
        &copy; 2024 ECI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

