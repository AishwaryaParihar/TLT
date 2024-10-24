import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import SummaryApi from '../Common/Summary';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    batch: '',
    course: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!data.email || !data.password || !data.name || !data.confirmPassword || !data.batch || !data.course) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Failed to create student');
      }

      const result = await response.json();
      toast.success(result.message);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during Sign Up!');
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-white p-5 rounded-lg shadow-lg mx-auto flex flex-col items-center">
          <div className="w-24 h-24 relative overflow-hidden rounded-full mb-4">
            <label className="flex flex-col items-center bg-opacity-80 bg-slate-200 py-2 cursor-pointer text-center rounded-md">
              <span className="text-xs">Upload photo</span>
              <input type="file" className="hidden" />
            </label>
          </div>
          <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="block text-gray-700">Name :</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Batch :</label>
              <select
                name="batch"
                value={data.batch}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="">Select Batch</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Course :</label>
              <select
                name="course"
                value={data.course}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="">Select Course</option>
                <option value="Fast Track">Fast Track</option>
                <option value="Empowerment">Empowerment</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-gray-700">Email :</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="relative w-full">
              <label className="block text-gray-700">Password :</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="relative w-full">
              <label className="block text-gray-700">Confirm Password :</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 text-gray-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
