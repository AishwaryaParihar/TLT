import React, { useContext } from 'react';
import UserContext from './COntext';
import LeaderBoard from './LeaderBoard';
const StudentProfile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="relative bg-red-200 rounded-lg shadow-lg p-8 max-w-md w-full uppercase px-10">
        {/* Overlay lines */}
        <div className="absolute top-0 right-0 h-full w-full">
          <div className="border-r-8 border-red-600 h-20 absolute top-0 right-0"></div>
          <div className="border-l-8 border-red-600 h-20 absolute bottom-0 left-0"></div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {user.name}!
        </h2>
        <p className="text-gray-700 mb-2 ">
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <p className="text-gray-700 mb-2 ">
          <span className="font-bold">Email:</span>
          <span className="lowercase">{user.email}</span>
        </p>
        <p className="text-gray-700 mb-2 ">
          <span className="font-bold">Course:</span> {user.course}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Batch:</span> {user.batch}
        </p>
      </div>
      <LeaderBoard course={user.course} batch={user.batch} className="" />
    </div>
  );
};

export default StudentProfile;
