

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaMale, FaFemale } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminDashboard = () => {
  const [selectedElection, setSelectedElection] = useState('');
  const [totalVoters, setTotalVoters] = useState(0);
  const [maleVoters, setMaleVoters] = useState(0);
  const [femaleVoters, setFemaleVoters] = useState(0);
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/auth/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        const data = await response.json();
        
        const total = data.length;
        const males = data.filter(user => user.gender === 'male').length;
        const females = data.filter(user => user.gender === 'female').length;

        setTotalVoters(total);
        setMaleVoters(males);
        setFemaleVoters(females);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const fetchElections = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/election');
        const data = await response.json();
        setElections(data);
        setSelectedElection(data.length > 0 ? data[0]._id : '');
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/vote/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error('Failed to fetch votes:', error);
      }
    };

    fetchUsers();
    fetchElections();
    fetchVotes();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://online-voting-ulpa.onrender.com/api/candidate');
        const data = await response.json();

        const filteredCandidates = data.filter(candidate => candidate.election && candidate.election._id === selectedElection);
        setCandidates(filteredCandidates);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      }
    };

    if (selectedElection) {
      fetchCandidates();
    }
  }, [selectedElection]);

  const filteredVotes = votes.filter(vote => vote.electionId && vote.electionId._id === selectedElection);

  const voteCounts = candidates.map(candidate => {
    return {
      candidateName: candidate.candidateName,
      votes: filteredVotes.filter(vote => vote.candidateId._id === candidate._id).length,
    };
  });

  const colors = [
    '#1E3A8A', '#9333EA', '#14B8A6', '#F59E0B', '#EF4444', 
    '#10B981', '#3B82F6', '#6366F1', '#F472B6', '#E11D48',
  ];

  const dynamicColors = (index) => colors[index % colors.length];

  const barData = {
    labels: voteCounts.map(voteCount => voteCount.candidateName),
    datasets: [
      {
        label: 'Votes',
        data: voteCounts.map(voteCount => voteCount.votes),
        backgroundColor: voteCounts.map((_, index) => dynamicColors(index)),
      },
    ],
  };

  const doughnutData = {
    labels: voteCounts.map(voteCount => voteCount.candidateName),
    datasets: [
      {
        data: voteCounts.map(voteCount => voteCount.votes),
        backgroundColor: voteCounts.map((_, index) => dynamicColors(index)),
      },
    ],
  };

  const handleElectionChange = (event) => {
    setSelectedElection(event.target.value);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow p-8 bg-gray-100 bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 flex justify-center bg-blue-950 text-white p-3 rounded-2xl">Admin Dashboard</h1>
          <div className="flex justify-between items-center bg-white p-4 shadow rounded bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50">
            <div className="text-lg transform transition-transform hover:scale-110 hover:bg-gray-400 rounded-lg">
              <FaUsers className="inline mr-2" /> Total Voters: {totalVoters}
            </div>
            <div className="text-lg transform transition-transform hover:scale-110 hover:bg-gray-400 rounded-lg">
              <FaMale className="inline mr-2" /> Male: {maleVoters}
            </div>
            <div className="text-lg transform transition-transform hover:scale-110 hover:bg-gray-400 rounded-lg">
              <FaFemale className="inline mr-2" /> Female: {femaleVoters}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="election" className="block text-lg font-semibold mb-2">Select Election</label>
          <select
            id="election"
            value={selectedElection}
            onChange={handleElectionChange}
            className="w-full p-2 border border-gray-300 rounded bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50"
          >
            {elections.map(election => (
              <option key={election._id} value={election._id}>
                {election.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Candidates</h2>
          <ul className="bg-white p-4 shadow rounded bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 list-disc list-inside">
            {candidates.map((candidate, index) => (
              <li key={index} className="mb-2 p-2 transform transition-transform hover:scale-105 hover:bg-gray-400 rounded">
                <span className="font-semibold">{candidate.candidateName}</span> - {candidate.partyName}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
            <div className="bg-white p-4 shadow rounded h-80">
              <h2 className="text-2xl font-bold mb-4 flex justify-center">Bar Chart</h2>
              <div className="h-64">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="bg-white p-4 shadow rounded h-80">
              <h2 className="text-2xl font-bold mb-4 flex justify-center">Doughnut Chart</h2>
              <div className="h-64">
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;






