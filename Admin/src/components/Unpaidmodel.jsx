import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SummaryApi from '../Common/SummaryApi';
import * as XLSX from 'xlsx';

const Unpaidmodel = () => {
  const [allPapers, setAllPapers] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    fetchAllPapers();
  }, []);
  const fetchAllPapers = async () => {
    try {
      const result = await axios({
        url: SummaryApi.GetAllUnpaidModel.url,
        method: SummaryApi.GetAllUnpaidModel.method,
      });
      if (Array.isArray(result.data.data)) {
        setAllPapers(result.data.data);
      } else {
        console.error('Unexpected data format:', result.data.data);
        setAllPapers([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllPapers([]);
    }
  };

  // Delete paper data with confirmation
  const deletePaper = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this paper?'
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      await axios({
        url: SummaryApi.DeleteUnpaidModel.url.replace(':id', id),
        method: SummaryApi.DeleteUnpaidModel.method,
      });
      fetchAllPapers();
    } catch (error) {
      console.error('Error deleting paper:', error);
    }
  };
  // Update paper data with confirmation
  const updatePaper = async (id) => {
    const confirmUpdate = window.confirm(
      'Are you sure you want to save the changes?'
    );
    if (!confirmUpdate) return; // Exit if user cancels
    try {
      await axios({
        url: SummaryApi.UpdateUnpaidModel.url.replace(':id', id),
        method: SummaryApi.UpdateUnpaidModel.method,
        data: editData[id],
      });
      setEditMode(null);
      fetchAllPapers();
    } catch (error) {
      console.error('Error updating paper:', error);
    }
  };

  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [e.target.name]: e.target.value },
    });
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    setEditData({ [id]: allPapers.find((paper) => paper._id === id) });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPapers = allPapers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allPapers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Export to Excel function
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(allPapers); // Convert data to worksheet
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Previous Year Paper Form Data'
    ); // Add worksheet to workbook
    XLSX.writeFile(workbook, 'previousYearPaper_data.xlsx'); // Trigger the file download
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Unpaid Study Essa
      </h1>
      {/* Export to Excel Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>

      <div>
        {allPapers.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="shadow-md rounded-lg border-b border-gray-200">
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">S.no</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Number</th>
                  <th className="py-2 px-4 text-left">Created Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPapers.map((paper, index) => (
                  <tr
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100`}
                    key={paper._id}
                  >
                    <td className="py-2 px-4 text-gray-600">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === paper._id ? (
                        <input
                          type="text"
                          name="name"
                          value={editData[paper._id]?.name || ''}
                          onChange={(e) => handleChange(e, paper._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        paper.name
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === paper._id ? (
                        <input
                          type="email"
                          name="email"
                          value={editData[paper._id]?.email || ''}
                          onChange={(e) => handleChange(e, paper._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        paper.email
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === paper._id ? (
                        <input
                          type="tel"
                          name="number"
                          value={editData[paper._id]?.number || ''}
                          onChange={(e) => handleChange(e, paper._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        paper.number
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {new Date(paper.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      {editMode === paper._id ? (
                        <>
                          <button
                            onClick={() => updatePaper(paper._id)}
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
                            onClick={() => toggleEditMode(paper._id)}
                            className="px-3 py-1 rounded flex items-center"
                          >
                            <FaEdit className="text-blue-500 hover:text-blue-800" />
                          </button>
                          <button
                            onClick={() => deletePaper(paper._id)}
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
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default Unpaidmodel;
