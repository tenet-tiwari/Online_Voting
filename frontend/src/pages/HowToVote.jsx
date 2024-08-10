import React from 'react';

const HowToVote = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-green-100 to-pink-200 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Highlighted Header */}
        <h1 className="text-4xl font-bold text-center bg-blue-950 text-white py-4 rounded-lg shadow-md mb-8">
          How to Vote
        </h1>

        {/* Steps to Vote */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Register:</span> If you are visiting the website for the first time, register with your credentials.
            </li>
            <li className="pl-4">
              <span className="text-green-600 font-medium ">Required credentials:</span> Name, Gender, Date of Birth, Aadhar Card ID, Voter ID Card, Email ID, Password, and your Image.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Login:</span> If already registered, login with your credentials.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">User Dashboard:</span> After successful registration/login, you'll be directed to the user dashboard.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Upcoming Elections:</span> On the dashboard, find the link to upcoming elections and click on it.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Election Page:</span> You'll see all the elections with their names and dates. Only elections scheduled for today will be active.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Vote Now:</span> Click on the "Vote Now" button to proceed to the online EVM.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Online EVM:</span> Choose your preferred candidate and party to vote.
            </li>
            <li className="font-semibold">
              <span className="text-blue-700 underline underline-offset-2 text-xl">Completion:</span> After successfully casting your vote, you will be directed to the homepage.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowToVote;
