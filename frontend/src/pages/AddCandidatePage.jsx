
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../assets/admin/logo2.jpg';

const AddCandidatePage = () => {
  const [candidateData, setCandidateData] = useState({
    electionName: '',
    candidateName: '',
    candidateImage: '',
    partyName: '',
    partyLogo: '',
  });
  const [candidateImagePreview, setCandidateImagePreview] = useState(null);
  const [partyLogoPreview, setPartyLogoPreview] = useState(null);
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  // Fetch elections from backend on component mount
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/election');
        const data = await response.json();
        //console.log(data);
        setElections(data);
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    };

    fetchElections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateData({ ...candidateData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setCandidateData({ ...candidateData, [name]: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === 'candidateImage') {
        setCandidateImagePreview(reader.result);
      } else if (name === 'partyLogo') {
        setPartyLogoPreview(reader.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('electionName', candidateData.electionName);
    formData.append('candidateName', candidateData.candidateName);
    formData.append('candidateImage', candidateData.candidateImage);
    formData.append('partyName', candidateData.partyName);
    formData.append('partyLogo', candidateData.partyLogo);

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await fetch('https://online-voting-ulpa.onrender.com/api/candidate/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: formData, // FormData automatically sets the content type to multipart/form-data
      });

      if (response.ok) {
        console.log('Candidate added successfully');
        navigate('/admin');
      } else {
        console.error('Failed to add candidate:', await response.text());
      }
    } catch (error) {
      console.error('Error while adding candidate:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-5 mt-0 bg-blue-950 text-white p-3 rounded-2xl">
        Add New Candidate
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 lg:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Candidate Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="electionName" className="block text-lg font-semibold mb-2">
                  Select Election
                </label>
                <select
                  id="electionName"
                  name="electionName"
                  value={candidateData.electionName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select an election</option>
                  {elections.map((election) => (
                    <option key={election._id} value={election.name}>
                      {election.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="candidateName" className="block text-lg font-semibold mb-2">
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="candidateName"
                  name="candidateName"
                  value={candidateData.candidateName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="candidateImage" className="block text-lg font-semibold mb-2">
                  Candidate Image
                </label>
                <input
                  type="file"
                  id="candidateImage"
                  name="candidateImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="partyName" className="block text-lg font-semibold mb-2">
                  Party Name
                </label>
                <input
                  type="text"
                  id="partyName"
                  name="partyName"
                  value={candidateData.partyName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="partyLogo" className="block text-lg font-semibold mb-2">
                  Party Logo
                </label>
                <input
                  type="file"
                  id="partyLogo"
                  name="partyLogo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Add Candidate
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 p-4 flex items-center justify-center mb-0">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={logo1}
              alt="Candidate"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidatePage;
