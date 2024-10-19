import React, { useState } from 'react';
import SummaryApi from '../Common/SummaryApi';

const EnquiryAdd = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    interestedFor: '',
    batch: '',
    status: '',
    foundUs: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enquiry Submitted:', formData);
    
    try {
      const response = await fetch(SummaryApi.createEnquiryDetails.url, {
        method: SummaryApi.createEnquiryDetails.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      const data = await response.json();
      console.log('Response from server:', data);
      // Optionally, reset the form or show a success message
      setFormData({
        name: '',
        email: '',
        mobile: '',
        interestedFor: '',
        batch: '',
        status: '',
        foundUs: '',
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add Enquiry</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            placeholder="Enter your email"
          />
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            placeholder="Enter your mobile number"
          />
        </div>

        {/* Interested For (Dropdown) */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2">Interested For:</label>
          <select
            name="interestedFor"
            value={formData.interestedFor}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            <option value="" disabled>Select an option</option>
            <option value="empowerment">Empowerment Batch</option>
            <option value="fastTrack">Super 30 Fast Track</option>
          </select>
        </div>

        {/* Batch (Dropdown) */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2">Batch:</label>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            <option value="" disabled>Select a batch</option>
            <option value="Batch 1">Batch 1</option>
            <option value="Batch 2">Batch 2</option>
            <option value="Batch 3">Batch 3</option>
          </select>
        </div>

        {/* Passout / On Going (Dropdown) */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-700 mb-2">Passout / On Going:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            <option value="" disabled>Select status</option>
            <option value="llbComplete">B.A.LL.B Complete</option>
            <option value="llbPursuing">B.A.LL.B Pursuing</option>
          </select>
        </div>

        {/* How did you find us? (Radio Buttons) */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">How did you find us?</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="foundUs"
              value="Social Media"
              checked={formData.foundUs === 'Social Media'}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Social Media</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="foundUs"
              value="Word of Mouth"
              checked={formData.foundUs === 'Word of Mouth'}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Word of Mouth</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="foundUs"
              value="Google"
              checked={formData.foundUs === 'Google'}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Google</label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 transition"
          >
            Submit Enquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryAdd;
