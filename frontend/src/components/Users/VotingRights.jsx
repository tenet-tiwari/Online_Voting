










import React from 'react';
import logo1 from '../../assets/users/logo1.jpg';

const VotingRights = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="relative group">
        <img
          src={logo1}
          alt="Right to Vote"
          className="w-full h-auto object-cover rounded-lg transition-transform transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href="https://www.eci.gov.in/about-eci"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg md:text-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn about your Right to Vote
          </a>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Your Right to Vote</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Voting is a fundamental right in a democracy. It empowers you to choose your leaders and voice your opinions on important issues. By exercising your right to vote, you contribute to the shaping of your community and country.
          <br/>
          <br/>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Accumsan facilisi nibh libero maecenas; arcu magna consequat. Dolor congue imperdiet mattis vitae ipsum sollicitudin magna. Taciti morbi porttitor tempus vestibulum vivamus lobortis curabitur. Tortor congue non id metus sodales etiam eget nullam. Semper potenti suscipit justo integer commodo euismod integer urna. Aenean mi scelerisque enim; primis adipiscing placerat. Adipiscing praesent rhoncus metus vivamus sem phasellus netus senectus. Curae pellentesque aenean cursus semper rutrum potenti tempor. Sollicitudin lacus sem vulputate suspendisse mi. Rutrum proin ultrices sed sodales eget. Proin aptent pellentesque eros neque lacinia et gravida elementum maecenas. Dignissim suscipit nascetur taciti sapien est aliquet laoreet. Eget hendrerit vivamus mus elit curabitur rutrum curae. Per molestie massa diam lectus luctus. Facilisi egestas pellentesque torquent mauris justo auctor eu nulla. Nostra at at vel a quam himenaeos quisque faucibus. Habitasse interdum interdum tortor praesent nec leo class. Venenatis id adipiscing felis condimentum ridiculus bibendum. Pellentesque platea egestas nulla auctor auctor mus curabitur. Himenaeos rutrum et justo nisl fusce lacus. Leo velit nostra mi facilisi et velit senectus. Curae volutpat eleifend mollis fringilla; ut lacus. Sed elit fusce tincidunt porta ultricies urna. Fermentum convallis mollis risus parturient nascetur dolor felis. Porttitor phasellus quis venenatis, rhoncus class tempus. Montes semper justo leo nec luctus tellus fusce.
        </p>
      </div>
    </div>
  );
};

export default VotingRights;
