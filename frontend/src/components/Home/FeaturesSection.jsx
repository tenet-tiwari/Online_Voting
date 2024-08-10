
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-8">Features We Offer</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4">Secure Authentication</h3>
          <p className="text-gray-700">Ensures that only eligible voters can access the system. This typically involves multi-factor authentication (MFA), using credentials like voter IDs, Aadhar Card and password</p>
        </div>
        <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4">Anonymity and Privacy</h3>
          <p className="text-gray-700">Maintains voter confidentiality by anonymizing votes, ensuring that each vote is securely cast. This feature upholds the principle of secret ballots, preventing any possibility of vote tracing.</p>
        </div>
        <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4">Real-Time Vote Counting</h3>
          <p className="text-gray-700">Provides instant and accurate vote counting as votes are cast. This feature allows for immediate results after the voting period ends, reducing the time and effort needed for manual counting and minimizing the chance of human error.</p>
        </div>

        <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4">Role-Based Access Control</h3>
          <p className="text-gray-700">Implements different access levels for users and admin. This ensures that users can only perform actions relevant to their roles, enhancing system security and integrity by preventing unauthorized access to sensitive functionalities.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

