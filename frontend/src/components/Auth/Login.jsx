
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo2 from '../../assets/auth/logo4.jpg';

// const LoginPage = () => {
//   const [role, setRole] = useState('user');
//   const [adminPassKey, setAdminPassKey] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [aadharCardId, setaadharCardId] = useState('');
//   const [voterIdCard, setvoterIdCard] = useState('');
//   const navigate = useNavigate();

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   const handleInputChange = (setter) => (event) => {
//     setter(event.target.value);
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
    
//     const data = {
//       role,
//       email,
//       password,
//       aadharCardId,
//       voterIdCard,
//     };

//     // Conditionally add adminPassKey only if role is admin
//     if (role === 'admin') {
//       data.adminPassKey = adminPassKey;
//     }

//     try {
//       const response = await fetch('https://online-voting-ulpa.onrender.com/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', result.token);

//         // Redirect based on role
//         if (role === 'admin') {
//           navigate('/admin');
//         } else {
//           navigate('/users');
//         }
//       } else {
//         console.error('Login failed:', result.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       <div className="w-full md:w-1/2 p-8 bg-gray-100 flex items-center justify-center">
//         <form onSubmit={onSubmit} className="w-full max-w-lg">
//           <h1 className="text-3xl font-bold mb-6 text-center bg-gray-800 text-white p-4 rounded">
//             Login
//           </h1>

//           <div className="mb-4">
//             <label htmlFor="role" className="block text-lg font-semibold mb-2">Role</label>
//             <select
//               id="role"
//               value={role}
//               onChange={handleRoleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {role === 'admin' && (
//             <div className="mb-4">
//               <label htmlFor="adminPassKey" className="block text-lg font-semibold mb-2">Admin Pass Key</label>
//               <input
//                 type="password"
//                 id="adminPassKey"
//                 value={adminPassKey}
//                 onChange={handleInputChange(setAdminPassKey)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-lg font-semibold mb-2">Email ID</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={handleInputChange(setEmail)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={handleInputChange(setPassword)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="aadharCardId" className="block text-lg font-semibold mb-2">Aadhar Card Number</label>
//             <input
//               type="text"
//               id="aadharCardId"
//               value={aadharCardId}
//               onChange={handleInputChange(setaadharCardId)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="voterIdCard" className="block text-lg font-semibold mb-2">Voter ID Card Number</label>
//             <input
//               type="text"
//               id="voterIdCard"
//               value={voterIdCard}
//               onChange={handleInputChange(setvoterIdCard)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full"
//           >
//             Login
//           </button>
//         </form>
//       </div>

//       <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-b from-blue-100 via-green-100 to-pink-200">
//         <div
//           className="w-3/4 h-3/4 bg-cover bg-center"
//           style={{ backgroundImage: `url(${logo2})`, objectFit: 'contain' }}
//         >
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../assets/auth/logo4.jpg';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [adminPassKey, setAdminPassKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharCardId, setaadharCardId] = useState('');
  const [voterIdCard, setvoterIdCard] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      role,
      email,
      password,
      aadharCardId,
      voterIdCard,
    };

    // Conditionally add adminPassKey only if role is admin
    if (role === 'admin') {
      data.adminPassKey = adminPassKey;
    }

    try {
      const response = await fetch('https://online-voting-ulpa.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/users');
        }
      } else {
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <form onSubmit={onSubmit} className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gray-800 text-white p-4 rounded">
            Login
          </h1>

          <div className="mb-4">
            <label htmlFor="role" className="block text-lg font-semibold mb-2">Role</label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === 'admin' && (
            <div className="mb-4">
              <label htmlFor="adminPassKey" className="block text-lg font-semibold mb-2">Admin Pass Key</label>
              <input
                type="password"
                id="adminPassKey"
                value={adminPassKey}
                onChange={handleInputChange(setAdminPassKey)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="aadharCardId" className="block text-lg font-semibold mb-2">Aadhar Card Number</label>
            <input
              type="text"
              id="aadharCardId"
              value={aadharCardId}
              onChange={handleInputChange(setaadharCardId)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="voterIdCard" className="block text-lg font-semibold mb-2">Voter ID Card Number</label>
            <input
              type="text"
              id="voterIdCard"
              value={voterIdCard}
              onChange={handleInputChange(setvoterIdCard)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full"
          >
            Login
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-gradient-to-b from-blue-100 via-green-100 to-pink-200 flex items-center justify-center">
        <div
          className="w-3/4 md:w-2/3 h-1/2 md:h-3/4 bg-cover bg-center"
          style={{ backgroundImage: `url(${logo2})`, objectFit: 'contain' }}
        >
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
