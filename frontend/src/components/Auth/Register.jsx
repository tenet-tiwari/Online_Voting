

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { isBefore, subYears } from 'date-fns';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import logo2 from '../../assets/auth/logo1.jpg';

// const RegisterPage = () => {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const [role, setRole] = useState('user'); // Default role is 'user'
//   const navigate = useNavigate();

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach(key => {
//         if (key === 'image') {
//           formData.append(key, data[key][0]); // Append file
//         } else {
//           formData.append(key, data[key]); // Append other form data
//         }
//       });

//       const response = await axios.post('https://online-voting-ulpa.onrender.com/api/auth/register', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Save the token to local storage
//       localStorage.setItem('token', response.data.token);

//       // Redirect based on role
//       if (data.role === 'admin') {
//         navigate('/admin');
//       } else {
//         navigate('/users');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       // Handle error (e.g., show a notification)
//     }
//   };

//   const dob = watch('dob');
//   const isAdult = dob ? isBefore(new Date(dob), subYears(new Date(), 18)) : true;

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       <div className="w-full md:w-1/2 p-8 bg-gray-100 flex items-center justify-center">
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
//           <h1 className="text-3xl font-bold mb-6 text-center bg-gray-800 text-white p-4 rounded">
//             Register
//           </h1>
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-lg font-semibold mb-2">Role</label>
//             <select id="role" {...register('role')} onChange={handleRoleChange} className="w-full p-2 border border-gray-300 rounded">
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
//                 {...register('adminPassKey', { required: role === 'admin' })}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.adminPassKey && <span className="text-red-500">Admin Pass Key is required</span>}
//             </div>
//           )}

//           <div className="mb-4">
//             <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
//             <input
//               type="text"
//               id="name"
//               {...register('name', { required: true })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.name && <span className="text-red-500">Name is required</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="gender" className="block text-lg font-semibold mb-2">Gender</label>
//             <select id="gender" {...register('gender', { required: true })} className="w-full p-2 border border-gray-300 rounded">
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//             {errors.gender && <span className="text-red-500">Gender is required</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="dob" className="block text-lg font-semibold mb-2">Date of Birth</label>
//             <input
//               type="date"
//               id="dob"
//               {...register('dob', {
//                 required: true,
//                 validate: value => isAdult || 'You must be at least 18 years old',
//               })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="aadharCardId" className="block text-lg font-semibold mb-2">Aadhar Card Number</label>
//             <input
//               type="text"
//               id="aadharCardId"
//               {...register('aadharCardId', { required: true })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.aadharCardId && <span className="text-red-500">Aadhar Card Number is required</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="voterIdCard" className="block text-lg font-semibold mb-2">Voter ID Card Number</label>
//             <input
//               type="text"
//               id="voterIdCard"
//               {...register('voterIdCard', { required: true })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.voterIdCard && <span className="text-red-500">Voter ID Card Number is required</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-lg font-semibold mb-2">Email ID</label>
//             <input
//               type="email"
//               id="email"
//               {...register('email', { required: true })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.email && <span className="text-red-500">Email ID is required</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               {...register('password', { required: true })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.password && <span className="text-red-500">Password is required</span>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="image" className="block text-lg font-semibold mb-2">Profile Image</label>
//             <input
//               type="file"
//               id="image"
//               {...register('image', { required: true })}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             {errors.image && <span className="text-red-500">Profile Image is required</span>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full"
//           >
//             Register
//           </button>
//         </form>
//       </div>

//       <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-b from-pink-200 via-red-200 to-red-300">
//         <div
//           className="w-3/4 h-3/4 bg-cover bg-center"
//           style={{ backgroundImage: `url(${logo2})`, objectFit: 'contain' }}
//         >
//           {/* Background image with gradient */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;













import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isBefore, subYears } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../assets/auth/logo1.jpg';

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'image') {
          formData.append(key, data[key][0]); // Append file
        } else {
          formData.append(key, data[key]); // Append other form data
        }
      });

      const response = await axios.post('https://online-voting-ulpa.onrender.com/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Save the token to local storage
      localStorage.setItem('token', response.data.token);

      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/users');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error (e.g., show a notification)
    }
  };

  const dob = watch('dob');
  const isAdult = dob ? isBefore(new Date(dob), subYears(new Date(), 18)) : true;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-8 bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gray-800 text-white p-4 rounded">
            Register
          </h1>
          <div className="mb-4">
            <label htmlFor="role" className="block text-lg font-semibold mb-2">Role</label>
            <select id="role" {...register('role')} onChange={handleRoleChange} className="w-full p-2 border border-gray-300 rounded">
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
                {...register('adminPassKey', { required: role === 'admin' })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.adminPassKey && <span className="text-red-500">Admin Pass Key is required</span>}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <span className="text-red-500">Name is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-lg font-semibold mb-2">Gender</label>
            <select id="gender" {...register('gender', { required: true })} className="w-full p-2 border border-gray-300 rounded">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="text-red-500">Gender is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="dob" className="block text-lg font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              id="dob"
              {...register('dob', {
                required: true,
                validate: value => isAdult || 'You must be at least 18 years old',
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="aadharCardId" className="block text-lg font-semibold mb-2">Aadhar Card Number</label>
            <input
              type="text"
              id="aadharCardId"
              {...register('aadharCardId', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.aadharCardId && <span className="text-red-500">Aadhar Card Number is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="voterIdCard" className="block text-lg font-semibold mb-2">Voter ID Card Number</label>
            <input
              type="text"
              id="voterIdCard"
              {...register('voterIdCard', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.voterIdCard && <span className="text-red-500">Voter ID Card Number is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Email ID</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <span className="text-red-500">Email ID is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-lg font-semibold mb-2">Profile Image</label>
            <input
              type="file"
              id="image"
              {...register('image', { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.image && <span className="text-red-500">Profile Image is required</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full"
          >
            Register
          </button>
        </form>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gradient-to-b from-pink-200 via-red-200 to-red-300">
        <div
          className="w-3/4 h-3/4 bg-cover bg-center"
          style={{ backgroundImage: `url(${logo2})`, objectFit: 'contain' }}
        >
          {/* Background image with gradient */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
