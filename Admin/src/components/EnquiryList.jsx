import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SummaryApi from '../Common/SummaryApi'; 

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Fetch enquiries from the API
  const fetchEnquiries = async () => {
    try {
      const result = await axios({
        url: SummaryApi.getEnquiryDetails.url,
        method: SummaryApi.getEnquiryDetails.method,
      });
      if (result.status === 200) {
        const sortedData = result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEnquiries(sortedData);
      } else {
        toast.error(result.data.message || 'Failed to fetch enquiries');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the enquiries.');
    }
  };

  // Update enquiry data
  const updateEnquiry = async (id) => {
    const apiUrl = SummaryApi.updateEnquiryDetails.url.replace(':id', id);
    try {
      await axios({
        url: apiUrl,
        method: SummaryApi.updateEnquiryDetails.method,
        data: editData[id],
      });
      setEditMode(null);
      fetchEnquiries();
      toast.success('Enquiry updated successfully!');
    } catch (error) {
      console.error('Error updating enquiry:', error);
      toast.error('Error updating enquiry.');
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    const apiUrl = SummaryApi.deleteEnquiryDetails.url.replace(':id', id);
    try {
      await axios({
        url: apiUrl,
        method: SummaryApi.deleteEnquiryDetails.method,
      });
      fetchEnquiries();
      toast.success('Enquiry deleted successfully!');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Error deleting enquiry.');
    }
  };

  // Handle input change for editing
  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [e.target.name]: e.target.value },
    });
  };

  // Toggle edit mode
  const toggleEditMode = (id) => {
    setEditMode(id);
    setEditData({ [id]: enquiries.find((enquiry) => enquiry._id === id) });
  };

  // Calculate total pages
  const totalPages = Math.ceil(enquiries.length / itemsPerPage);

  // Get current items to display
  const currentItems = enquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Enquiries List</h2>

      {enquiries.length > 0 ? (
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">S.No</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Name</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Email</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Mobile</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Interested For</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Batch</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Found Us</th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((enquiry, index) => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-300">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editMode === enquiry._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData[enquiry._id]?.name || ''}
                        onChange={(e) => handleChange(e, enquiry._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      enquiry.name
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {editMode === enquiry._id ? (
                      <input
                        type="email"
                        name="email"
                        value={editData[enquiry._id]?.email || ''}
                        onChange={(e) => handleChange(e, enquiry._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      enquiry.email
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">{enquiry.mobile}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{enquiry.interestedFor}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{enquiry.batch}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{enquiry.status}</td>
                  <td className="px-6 py-4 border-b border-gray-300">{enquiry.foundUs}</td>
                  <td className="px-6 py-4 border-b border-gray-300 ">
                    {editMode === enquiry._id ? (
                      <>
                        <button
                          onClick={() => updateEnquiry(enquiry._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditMode(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleEditMode(enquiry._id)}
                          className="px-3 py-1 rounded flex items-center"
                        >
                          <FaEdit className="text-blue-500 hover:text-blue-800" />
                        </button>
                        <button
                          onClick={() => deleteEnquiry(enquiry._id)}
                          className="px-3 py-1 rounded flex items-center"
                        >
                          <FaTrashAlt className="text-red-500 hover:text-red-700" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {currentPage > 2 && (
                <>
                  <span onClick={() => handlePageChange(1)} className="cursor-pointer">1</span>
                  <span className="text-gray-500">...</span>
                </>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <span
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`cursor-pointer ${currentPage === index + 1 ? 'font-bold bg-blue-600 text-white px-2' : ''}`}
                >
                  {index + 1}
                </span>
              ))}
              {currentPage < totalPages - 1 && (
                <>
                  <span className="text-gray-500">...</span>
                  <span onClick={() => handlePageChange(totalPages)} className="cursor-pointer">{totalPages}</span>
                </>
              )}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No enquiries found.</div>
      )}
    </div>
  );
};

export default EnquiryList;
