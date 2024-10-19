
// import React, { useState } from 'react';
// import { FaEyeSlash, FaEye } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import loginIcon from '../assets/signup-icon.webp'; // Ensure the path is correct
// import SummaryApi from '../Common/SummaryAPI';
// import { toast } from 'react-toastify';
// //import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is correct

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [data, setData] = useState({
//     email: "",
//     batch:"",
//     password: "",
//     name: "",
//     confirmPassword: ""
//   });
//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (data.password !== data.confirmPassword) {
//       toast.error("Passwords do not match!");
//       alert("Passwords do not match!");
//       return;
//     }

//     if (!data.email || !data.password || !data.name || !data.confirmPassword) {
//       toast.error("All fields are required!");
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const response = await fetch(SummaryApi.signUp.url, {
//         method: SummaryApi.signUp.method,
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();
//       console.log("API response:", result); // Log the response for debugging
//       if (response.ok && result.success) {
//         toast.success(result.message);
//         alert("User registered successfully!");
//         navigate("/login");
//       } else {
//         toast.error(result.message || "Sign Up failed!");
//         alert(result.message || "Sign Up failed!");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred during Sign Up!");
//       alert("An error occurred during Sign Up!");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <section id="signup" className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="container max-w-md mx-auto p-4">
//         <div className="bg-white p-5 rounded-lg shadow-lg mx-auto flex flex-col items-center">
//           <div className="w-24 h-24 relative overflow-hidden rounded-full mb-4">
//             <img src={loginIcon} className="h-full w-full object-cover" alt="Sign Up Icon" />
//             <label className="flex flex-col items-center bg-opacity-80 bg-slate-200 py-2 cursor-pointer text-center rounded-md">
//               <span className="text-xs">Upload photo</span>
//               <input type="file" className="hidden" />
//             </label>
//           </div>
//           <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
//             <div className="w-full">
//               <label className="block text-gray-700">Name :</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={data.name}
//                 onChange={handleOnChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-gray-700">Batch :</label>
//               <input
//                 type="text"
//                 name="batch"
//                 placeholder="Enter your batch"
//                 value={data.batch}
//                 onChange={handleOnChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-gray-700">Email :</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={data.email}
//                 onChange={handleOnChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
//               />
//             </div>
//             <div className="relative w-full">
//               <label className="block text-gray-700">Password :</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={data.password}
//                 onChange={handleOnChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 text-gray-500"
//               >
//                 {showPassword ? (
//                   <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
//                 ) : (
//                   <FaEye className="h-5 w-5" aria-hidden="true" />
//                 )}
//               </button>
//             </div>
//             <div className="relative w-full">
//               <label className="block text-gray-700">Confirm Password :</label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 placeholder="Confirm your password"
//                 value={data.confirmPassword}
//                 onChange={handleOnChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
//               />
//               <button
//                 type="button"
//                 onClick={toggleConfirmPasswordVisibility}
//                 className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 text-gray-500"
//               >
//                 {showConfirmPassword ? (
//                   <FaEyeSlash className="h-5 w-5" aria-hidden="true" />
//                 ) : (
//                   <FaEye className="h-5 w-5" aria-hidden="true" />
//                 )}
//               </button>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="mt-4 text-center">
//             <p className="text-sm">
//               Already have an account?
//               <Link to="/login" className="text-blue-500 hover:underline text-red-500"> Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../assets/signup-icon.webp'; // Ensure the path is correct
import SummaryApi from '../Common/SummaryAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is correct

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    batch: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!data.email || !data.password || !data.name || !data.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log("API response:", result); // Log the response for debugging
      if (response.ok && result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message || "Sign Up failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during Sign Up!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section id="signup" className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-white p-5 rounded-lg shadow-lg mx-auto flex flex-col items-center">
          <div className="w-24 h-24 relative overflow-hidden rounded-full mb-4">
            <img src={loginIcon} className="h-full w-full object-cover" alt="Sign Up Icon" />
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
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
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
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
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
              <Link to="/login" className="text-blue-500 hover:underline"> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

