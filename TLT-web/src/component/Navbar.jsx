import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import SummaryApi from '../Common/SummaryAPI';
import { setUserDetails } from '../store/userSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout.url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null)); // Clear user data
        navigate('/login'); // Redirect to login after logout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while logging out.');
      console.error('Logout error:', error);
    }
  };


  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'text-red-500 font-semibold' // Active state styles
      : 'text-gray-800 hover:text-red-700 font-semibold'; // Default state styles

  return (
    <div className="bg-gray-100 bg-opacity-50 mx-14 my-3 hidden md:block rounded-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 ps-5 gap-4">
          <NavLink
           className={getNavLinkClass}
            to="/"
          >
            Home
          </NavLink>
          <NavLink className={getNavLinkClass} to="/about">
            About
          </NavLink>
          <div className="relative z-10 group ">
            <button className="textWhite hover:text-red-700 w-32 text-left">
              Study Essentials
            </button>
            <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors group-hover:opacity-100  duration-300 ease-in-out font-semibold rounded-md"
                to="/study-essentials"
              >
                Paid
              </NavLink>
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md"
                to="/unpaid-study-essentials"
              >
              Exclusive Free Material
              </NavLink>

              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md "
                to="/syllabus"
              >
                Syllabus
              </NavLink>
            </div>
          </div>

          <NavLink className={getNavLinkClass} to="/gallery">
            Gallery
          </NavLink>
          <NavLink className={getNavLinkClass} to="/previous-year">
            Previous Year Paper
          </NavLink>
          <div className="group relative z-10">
            <button className="textWhite hover:text-red-700 w-32 text-left">
              Mock Test
            </button>
            <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              <NavLink
            className={`${getNavLinkClass} block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md`}
                to="/mockTest/subjectTest"
              >
                Subject Test
              </NavLink>
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md"
                to=""
              >
                Mini Mock
              </NavLink>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center space-x-4">
          <div className="text-2xl cursor-pointer">
            <NavLink to="/profile">
              <FaRegUser />
            </NavLink>
          </div>
          <div className="bg-red-500 text-white w-20 h-8 rounded-full flex items-center justify-center hover:bg-red-800">
            {user ? (
              <button onClick={handleLogout} className="text-lg">Logout</button>
            ) : (
              <NavLink to="/login">
                <button className="text-lg">Login</button>
              </NavLink>
            )}
          </div>
        </div> */}
        <div className="relative flex space-x-4 items-center p-0 m-0 z-10">
          <div className="group relative">
            <button className="bg-primary text-white uppercase font-bold text-sm py-7 px-4 inline-block transition duration-300 ease-in-out hover:bg-red-600 m-0 rounded-e-md">
              Register In
            </button>
            <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md"
                to="/empowerment"
              >
                Empowerment Batch
              </NavLink>
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md"
                to="/fastTrack"
              >
                Fast Track Batch
              </NavLink>
              <NavLink
                className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out font-semibold rounded-md"
                to="/jet/personalInfo"
              >
                JET
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
