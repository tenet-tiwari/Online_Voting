
// src/components/MembersSection.js
import React from 'react';
import logo1 from '../../assets/members/logo1.png';
import logo2 from '../../assets/members/logo2.jpg';
import logo3 from '../../assets/members/logo3.png';

const members = [
  { name: 'John Doe', role: 'CEO', image: logo1 },
  { name: 'Jane Smith', role: 'CTO', image: logo2 },
  { name: 'Bob Johnson', role: 'COO', image: logo3 },
];

const MembersSection = () => {
  return (
    <section className="py-16 text-center bg-gradient-to-r from-gray-200 via-blue-50 to-blue-100">
      <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {members.map((member, index) => (
          <div key={index} className="w-64 p-4 flex flex-col items-center">
            <div className="relative w-40 h-40">
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-semibold mt-4">{member.name}</h3>
            <p className="mt-2 text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;

