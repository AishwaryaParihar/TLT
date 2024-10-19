import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Importing the logout icon
import Logo from '../assets/TLTlogo.png';

const Header = () => {
  const navigate = useNavigate();

  // Logout logic
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');

    // Redirect to the login page after logout
    navigate('/');
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-12 w-9 mr-3 rounded-full" />
        <h1 className="text-3xl underline font-bold text-gray-800">TLT <span className="text-red-500">Judicial </span>Academy</h1>
      </div>

      {/* Right Side: Logout Icon */}
      <div
        className="flex items-center cursor-pointer text-gray-700 hover:text-red-600 transition-all duration-200"
        onClick={handleLogout}
      >
        <FiLogOut className="text-3xl" />
      </div>
    </header>
  );
};

export default Header;
