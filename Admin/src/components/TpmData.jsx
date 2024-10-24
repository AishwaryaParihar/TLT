import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import SummaryApi from '../Common/SummaryApi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const TpmData = () => {
  const [tpmData, setTpmData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch all TPM data
  const fetchAllData = async () => {
    try {
      const result = await axios({
        url: SummaryApi.TpmData.url,
        method: SummaryApi.TpmData.method,
      });
      if (result.status === 200) {
        const sortedData = result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTpmData(sortedData);
      } else {
        toast.error(result.data.message || 'Failed to fetch data');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the data.');
    }
  };

  // Handle input change
  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [e.target.name]: e.target.value },
    });
  };

  // Update TPM data
  const updateTpmData = async (id) => {
    const apiurl = SummaryApi.TpmDataUpdate.url.replace(':id', id);
    try {
      await axios({
        url: apiurl,
        method: SummaryApi.TpmDataUpdate.method,
        data: editData[id],
      });
      setEditMode(null);
      fetchAllData();
      toast.success('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data.');
    }
  };

  // Delete TPM data
  const deleteTpmData = async (id) => {
    const apiurl = SummaryApi.TpmDataDelete.url.replace(':id', id);
    try {
      await axios({
        url: apiurl,
        method: SummaryApi.TpmDataDelete.method,
      });
      fetchAllData();
      toast.success('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data.');
    }
  };

  // Toggle edit mode
  const toggleEditMode = (id) => {
    setEditMode(id);
    setEditData({ [id]: tpmData.find((data) => data._id === id) });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tpmData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tpmData.length / itemsPerPage);

  // Export to Excel function
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tpmData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TPM Form Data');
    XLSX.writeFile(workbook, 'TPM_data.xlsx');
  };

  // Get pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // Calculate start and end page
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we are near the beginning or end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipses if needed
    if (startPage > 1) {
      pages.unshift('...');
      if (startPage > 2) {
        pages.unshift(1);
      }
    }
    if (endPage < totalPages) {
      pages.push('...');
      if (endPage < totalPages - 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">TPM Data</h2>
      {/* Export to Excel Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>

      <div>
        {tpmData.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">S.No.</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Contact No</th>
                  <th className="py-2 px-4 text-left">Purchased Product</th>
                  <th className="py-2 px-4 text-left">Created Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((data, index) => (
                  <tr
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100`}
                    key={data._id}
                  >
                    <td className="py-2 px-4">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="py-2 px-4">
                      {editMode === data._id ? (
                        <input
                          type="text"
                          name="name"
                          value={editData[data._id]?.name || ''}
                          onChange={(e) => handleChange(e, data._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        data.name
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editMode === data._id ? (
                        <input
                          type="email"
                          name="email"
                          value={editData[data._id]?.email || ''}
                          onChange={(e) => handleChange(e, data._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        data.email
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editMode === data._id ? (
                        <input
                          type="tel"
                          name="contact"
                          value={editData[data._id]?.contact || ''}
                          onChange={(e) => handleChange(e, data._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        data.contact
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editMode === data._id ? (
                        <input
                          type="text"
                          name="purchasedProduct"
                          value={editData[data._id]?.purchasedProduct || ''}
                          onChange={(e) => handleChange(e, data._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        data.purchasedProduct
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {moment(data.createdAt).format('YYYY-MM-DD')}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      {editMode === data._id ? (
                        <>
                          <button
                            onClick={() => updateTpmData(data._id)}
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
                            onClick={() => toggleEditMode(data._id)}
                            className="text-blue-500 hover:underline"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteTpmData(data._id)}
                            className="text-red-500 hover:underline"
                          >
                            <FaTrashAlt />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-1 items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>

              <div>
                {getPaginationNumbers().map((number, index) => (
                  <span
                    key={index}
                    className={`mx-1 cursor-pointer ${
                      number === currentPage
                        ? 'font-bold text-white bg-blue-500 px-2 py-1'
                        : 'text-blue-400'
                    }`}
                    onClick={() => {
                      if (number !== '...') {
                        setCurrentPage(number);
                      }
                    }}
                  >
                    {number}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TpmData;
