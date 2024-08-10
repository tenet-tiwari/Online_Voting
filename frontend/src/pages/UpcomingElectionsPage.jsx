

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

const UpcomingElectionsPage = () => {
  const [electionsData, setElectionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElectionsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/election'); // Replace with your API endpoint
        setElectionsData(response.data);
      } catch (err) {
        setError('Failed to fetch elections data');
      } finally {
        setLoading(false);
      }
    };

    fetchElectionsData();
  }, []);

  const handleVoteNow = (id) => {
    navigate(`/users/vote/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
        Upcoming Elections
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {electionsData.map((election) => (
          <div
            key={election._id} // Use unique identifier from the backend response
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-bold mb-2">{election.name}</h2>
            <p className="text-gray-600 mb-2">{new Date(election.date).toLocaleDateString()}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleVoteNow(election._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Vote Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingElectionsPage;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UpcomingElectionsPage = () => {
//   const [electionsData, setElectionsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchElectionsData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/election');
//         setElectionsData(response.data);
//       } catch (err) {
//         setError('Failed to fetch elections data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchElectionsData();
//   }, []);

//   const handleVoteNow = (id) => {
//     navigate(`/users/vote/${id}`);
//   };

//   // Get the current date and format it to match the election date format
//   const currentDate = new Date().toLocaleDateString();

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
//       <h1 className="text-4xl font-bold text-center mb-10 bg-blue-950 text-white p-4 rounded-2xl">
//         Upcoming Elections
//       </h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {electionsData.map((election) => {
//           const electionDate = new Date(election.date).toLocaleDateString();
//           const isElectionToday = currentDate === electionDate;

//           return (
//             <div
//               key={election._id} // Use unique identifier from the backend response
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
//             >
//               <h2 className="text-2xl font-bold mb-2">{election.name}</h2>
//               <p className="text-gray-600 mb-2">{electionDate}</p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => handleVoteNow(election._id)}
//                   className={`${
//                     isElectionToday
//                       ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
//                       : 'bg-gray-400 cursor-not-allowed'
//                   } text-white px-4 py-2 rounded transition-colors duration-300`}
//                   disabled={!isElectionToday} // Disable the button if it's not election day
//                 >
//                   Vote Now
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default UpcomingElectionsPage;
