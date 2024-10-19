import React from 'react';
import {
  FaUserCircle,
  FaRegFilePdf,
  FaTachometerAlt,
} from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import StudentHeader from '../Components/StudentHeader'



const Sidebar = () => {


  return (
    <div className="min-h-screen md:flex hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-red-600 w-64 customShadow text-white">
        {/* Profile Section */}
        <div className="h-40 flex flex-col items-center justify-center bg-red-700 border-b border-red-500">
          <div className="text-6xl cursor-pointer relative flex justify-center mb-2">
            <FaUserCircle className="rounded-full bg-white p-1 text-red-700" />
          </div>
          <p className="capitalize text-lg font-semibold">Student Panel</p>
          {/* <p className="text-xs text-gray-200">Administrator</p> */}
        </div>
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link
            to="dashboardcards"
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition-all hover:shadow-md"
          >
            <FaTachometerAlt />
            <span>Student Profile</span>
          </Link>

         
          <Link
            to="leaderboard"
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400 transition-all hover:shadow-md"
          >
            <FaRegFilePdf />
         
            <span>Leader Board</span>
          </Link>
         
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
      
        <main className="p-4">
          <StudentHeader/>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
