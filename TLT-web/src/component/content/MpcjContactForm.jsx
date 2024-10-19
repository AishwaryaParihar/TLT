import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import SummaryApi from '../../Common/SummaryAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MpcjContactForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    contact: '',
    purchasedProduct: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid =
      data.name && data.email && data.contact && data.purchasedProduct;

    if (valid) {
      try {
        const response = await fetch(SummaryApi.createMPCJFormDetails.url, {
          method: SummaryApi.createMPCJFormDetails.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // Check if response is OK
        if (!response.ok) {
          const errorText = await response.text(); // Get the response as text
          console.error('Error details:', errorText);
          throw new Error('Network response was not ok');
        }

        // Check content type for response
        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.includes('application/json')) {
          result = await response.json(); // Parse as JSON if it is JSON
        } else {
          const textResponse = await response.text(); // Otherwise, read as text
          console.log('Received non-JSON response:', textResponse);
          // If the response is a URL, redirect to it
          window.location.href = textResponse; // Use the text response for redirection
          return; // Exit the function
        }

        console.log('Success:', result);

        // Handle the JSON result if needed
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl; // Ensure the correct key is used
        } else {
          console.error('Redirect URL not found in response:', result);
        }

        // If there is no redirect URL, show a success message
        toast.success('Form submitted successfully!');
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        toast.error(
          'There was a problem submitting the form. Please try again.'
        );
      }
    } else {
      console.log('Please fill in all the fields');
      toast.error('Please fill in all the fields.');
    }
  };

  return (
    <div className="form-container mx-5 md:my-20 my-10">
      <div className="form-box flex justify-center items-center min-h-screen">
        <div className="container-main p-6 rounded-lg max-w-lg mx-auto">
          <h2 className="text-4xl font-bold text-shadow bg-clip-text text-gray-900 text-center mb-6">
            Get your MPCJ Mains Offline Mock Test Series,
            <span className="text-red-500">Today!</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row flex space-x-4 mb-6">
              <div className="input-data w-full relative">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="block w-full focus:border-red-500 outline-none"
                  required
                />
                <label className="absolute left-0 bottom-1 text-gray-500 transition-all">
                  Your Name
                </label>
                <div className="underline"></div>
              </div>
            </div>

            <div className="form-row flex space-x-4 mb-6">
              <div className="input-data w-full relative">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="block w-full focus:border-red-500 outline-none"
                  required
                />
                <label className="absolute left-0 bottom-1 text-gray-500 transition-all">
                  Email
                </label>
                <div className="underline"></div>
              </div>
            </div>

            <div className="form-row flex space-x-4 mb-6">
              <div className="input-data w-full relative">
                <input
                  type="tel"
                  name="contact"
                  value={data.contact}
                  onChange={handleChange}
                  className="block w-full focus:border-red-500 outline-none"
                  required
                />
                <label className="absolute left-0 bottom-1 text-gray-500 transition-all">
                  Contact No.
                </label>
                <div className="underline"></div>
              </div>
            </div>

            <div className="form-row flex space-x-4 mb-6">
              <div className="input-data w-full relative">
                <label
                  htmlFor="MPCJofflineMockTest"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-white pl-4"
                ></label>
                <select
                  id="MPCJofflineMockTest"
                  name="purchasedProduct"
                  value={data.purchasedProduct}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  required
                >
                  <option value="">Select Product</option>
                  <option value="MPCJ Mains Offline Mock Test - ₹ 4999">
                    MPCJ Mains Offline Mock Test - ₹ 4999
                  </option>
                </select>
                <div className="underline"></div>
              </div>
            </div>

            <div className="form-row submit-btn flex justify-center gap-3">
              <button
                type="submit"
                className="relative inline-block text-white bg-gradient-to-r p-4 px-14 from-red-700 to-red-400 hover:from-red-400 hover:to-red-700 font-semibold py-2 rounded-full transition-ease-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MpcjContactForm;
