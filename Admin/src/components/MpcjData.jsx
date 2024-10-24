import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import SummaryApi from '../Common/SummaryApi';

const MpcjData = () => {
  const [mpcjData, setMpcjData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const result = await axios({
        url: SummaryApi.GetMPCJFormDetails.url,
        method: SummaryApi.GetMPCJFormDetails.method,
      });
      console.log('API Response:', result.data);

      if (Array.isArray(result.data)) {
        const sortedPapers = result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMpcjData(sortedPapers);
      } else {
        console.error('Unexpected data format:', result.data);
        setMpcjData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMpcjData([]);
    }
  };

  const deleteData = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const urldata = SummaryApi.DeleteMPCJFormDetails.url.replace(':id', id);
        await axios({
          url: urldata,
          method: SummaryApi.DeleteMPCJFormDetails.method,
        });
        toast.success('Data deleted successfully!');
        fetchAllData();
      } catch (error) {
        console.error('Error deleting data:', error);
        toast.error('Error deleting data.');
      }
    }
  };

  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [e.target.name]: e.target.value },
    });
  };

  const updateData = async (id) => {
    if (window.confirm('Are you sure you want to update this entry?')) {
      try {
        await axios({
          url: SummaryApi.UpdateMPCJFormDetails.url.replace(':id', id),
          method: SummaryApi.UpdateMPCJFormDetails.method,
          data: editData[id],
        });
        setEditMode(null); // Exit edit mode after updating
        fetchAllData(); // Fetch updated data
        toast.success('Data updated successfully!');
      } catch (error) {
        console.error('Error updating data:', error);
        toast.error('Error updating data.');
      }
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    setEditData({ [id]: mpcjData.find((data) => data._id === id) });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = mpcjData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mpcjData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Maximum number of visible page numbers

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftEllipsis = currentPage > 2; // Show left ellipsis if current page is greater than 2
      const rightEllipsis = currentPage < totalPages - 1; // Show right ellipsis if current page is less than total pages - 1

      if (currentPage === 1) {
        pages.push(1, 2, rightEllipsis && '...');
        if (rightEllipsis) pages.push(totalPages);
      } else if (currentPage === totalPages) {
        pages.push(1, leftEllipsis && '...', totalPages - 1, totalPages);
      } else {
        pages.push(1, leftEllipsis && '...', currentPage - 1, currentPage, currentPage + 1, rightEllipsis && '...', totalPages);
      }
    }

    return pages.filter(Boolean); // Remove any false values (like ellipsis)
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(mpcjData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MPCJ Form Data');
    XLSX.writeFile(workbook, 'mpcj_data.xlsx');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">MPCJ Data</h2>
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>
      <div>
        {mpcjData.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="shadow-md rounded-lg border-b border-gray-200">
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">S.No</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Contact No</th>
                  <th className="py-2 px-4 text-left">Created Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data, index) => (
                  <tr
                    className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                    key={data._id}
                  >
                    <td className="py-2 px-4 text-gray-600">{indexOfFirstItem + index + 1}</td>
                    <td className="py-2 px-4 text-gray-600">
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
                    <td className="py-2 px-4 text-gray-600">
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
                    <td className="py-2 px-4 text-gray-600">
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
                    <td className="py-2 px-4 text-gray-600">
                      {moment(data.createdAt).format('YYYY-MM-DD')}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === data._id ? (
                        <button
                          onClick={() => updateData(data._id)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleEditMode(data._id)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteData(data._id)}
                            className="text-red-500 hover:text-red-700"
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

            {/* Pagination */}
            <div className="mt-4 flex justify-center gap-1 items-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`py-1 px-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              >
                Previous
              </button>
              <div className="flex items-center">
                {getPaginationNumbers().map((number, index) => (
                  <span
                    key={index}
                    onClick={() => typeof number === 'number' && handlePageChange(number)}
                    className={`py-1 px-2 border cursor-pointer ${number === currentPage ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                  >
                    {number}
                  </span>
                ))}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`py-1 px-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MpcjData;
