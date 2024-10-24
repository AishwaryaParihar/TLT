// // import React from 'react'

// // const StudentProfile = () => {
// //   return (
// //     <div>StudentProfile</div>
// //   )
// // }

// // export default StudentProfile



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch the profile data
//   const fetchProfile = async () => {
//     const token = localStorage.getItem('token'); // Assume the JWT token is stored in localStorage

//     try {
//       const response = await axios.get('http://localhost:8080/api/student-profile', {
//         headers: {
//           Authorization: `Bearer ${token}` // Pass the token in the Authorization header
//         }
//       });

//       setProfile(response.data.student); // Assuming the API returns the student profile in 'student' key
//       setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Student Profile</h1>
//       {profile && (
//         <div>
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Batch:</strong> {profile.batch}</p>
//           <p><strong>Course:</strong> {profile.course}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentProfile;


import React, { useContext } from 'react';
import UserContext from './COntext';


const StudentProfile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full uppercase px-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {user.name} !</h2>
        <p className="text-gray-700 mb-2 ">
          <span className="font-bold">Email:</span> <span>{user.name}</span>
        </p>
        <p className="text-gray-700 mb-2 ">
          <span className="font-bold">Email:</span > <span className='lowercase'>{user.email}</span>
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-bold">Course:</span> {user.course}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Batch:</span> {user.batch}
        </p>
        
      </div>
    </div>
  );
};

export default StudentProfile;

