import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SummaryApi from '../Common/SummaryApi';
import * as XLSX from 'xlsx';

const PreviousYearForm = () => {
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
        url: SummaryApi.GetAllPyPapers.url,
        method: SummaryApi.GetAllPyPapers.method,
      });
      if (Array.isArray(result.data.data)) {
        const sortedPapers = result.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllPapers(sortedPapers);
      } else {
        console.error('Unexpected data format:', result.data.data);
        setAllPapers([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllPapers([]);
    }
  };

  const deletePaper = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this paper?'
    );
    if (!confirmDelete) return;
    try {
      await axios({
        url: SummaryApi.DeletePyPapersDetail.url.replace(':id', id),
        method: SummaryApi.DeletePyPapersDetail.method,
      });
      fetchAllPapers();
    } catch (error) {
      console.error('Error deleting paper:', error);
    }
  };

  const updatePaper = async (id) => {
    const confirmUpdate = window.confirm(
      'Are you sure you want to save the changes?'
    );
    if (!confirmUpdate) return;
    try {
      await axios({
        url: SummaryApi.UpdatePyPapersDetail.url.replace(':id', id),
        method: SummaryApi.UpdatePyPapersDetail.method,
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

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Export to Excel function
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(allPapers);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Previous Year Paper Form Data');
    XLSX.writeFile(workbook, 'previousYearPaper_data.xlsx');
  };

  // Logic to limit pagination to 3 page numbers
  const renderPagination = () => {
    const maxPagesToShow = 2;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="startEllipsis" className="mx-1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="endEllipsis" className="mx-1">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Previous Year Paper Details</h1>
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
                    <td className="py-2 px-4 text-gray-600 flex space-x-4">
                      {editMode === paper._id ? (
                        <>
                          <button
                            onClick={() => updatePaper(paper._id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditMode(null)}
                            className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => toggleEditMode(paper._id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deletePaper(paper._id)}
                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded"
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
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="mx-1 px-3 py-1 border rounded bg-gray-200 text-gray-700"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {renderPagination()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="mx-1 px-3 py-1 border rounded bg-gray-200 text-gray-700"
                disabled={currentPage === totalPages}
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

export default PreviousYearForm;
