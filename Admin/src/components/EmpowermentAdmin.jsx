import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryApi from '../Common/SummaryApi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx'; // Import xlsx library

const EmpowermentForm = () => {
  const [empowermentData, setEmpowermentData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios({
          url: SummaryApi.EmpowermentAdmin.url,
          method: SummaryApi.EmpowermentAdmin.method,
        });
        console.log(result);
        const fetchedData = result.data.data || [];
        const sortedData = fetchedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEmpowermentData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEmpowermentData([]);
      }
    };
    getData();
  }, []);

  const deleteData = async (id) => {
    try {
      await axios({
        ...SummaryApi.EmpowermentAdminDelete,
        url: SummaryApi.EmpowermentAdminDelete.url.replace(':id', id),
      });
      setEmpowermentData(empowermentData.filter((data) => data._id !== id));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };

  const updateData = async (id) => {
    try {
      await axios({
        ...SummaryApi.EmpowermentAdminUpdate,
        url: SummaryApi.EmpowermentAdminUpdate.url.replace(':id', id),
        data: editData[id],
      });
      setEditMode(null);
      setEmpowermentData((prevData) =>
        prevData.map((item) => (item._id === id ? editData[id] : item))
      );
      setEditData({}); // Reset editData
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    const selectedData = empowermentData.find((data) => data._id === id);
    setEditData({ [id]: selectedData });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentForms = empowermentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(empowermentData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination numbers with ellipses logic
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Maximum number of visible page numbers

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page
      pageNumbers.push(1);
      
      // Handle the middle pages
      if (currentPage > 2) {
        pageNumbers.push('...');
      }
      if (currentPage - 1 > 1 && currentPage + 1 < totalPages) {
        pageNumbers.push(currentPage - 1);
      }
      pageNumbers.push(currentPage);
      if (currentPage + 1 < totalPages) {
        pageNumbers.push(currentPage + 1);
      }

      // Show last page
      if (currentPage < totalPages - 1) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Export to Excel function
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(empowermentData); // Convert data to worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Empowerment Data'); // Add worksheet to workbook
    XLSX.writeFile(workbook, 'empowerment_data.xlsx'); // Trigger the file download
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Empowerment Form Data</h1>

      {/* Export to Excel Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>

      {empowermentData.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
                'S.No',
                'Choose Picture',
                'Batch',
                'Name',
                'Place of Birth',
                'Date of Birth',
                'Full Address',
                'State',
                'Pin Code',
                'Qualification',
                'College/University',
                'Pursuing LL.B',
                'Year of Passing',
                'Email',
                "Father's Name",
                "Mother's Name",
                'Permanent Address',
                'State',
                'City',
                'Upload Aadhar (Front and Back)',
                'Fees Paid',
                'Amount Paid',
                'Old Student of Shubham Sir',
                'Institution',
                'Actions', // To include Edit and Delete actions
              ].map((heading, i) => (
                <th key={i} className="py-2 px-4 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentForms.map((data, index) => (
              <tr
                key={data._id}
                className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-2 px-4">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                {[
                  'photo',
                  'Batch',
                  'name',
                  'placeOfBirth',
                  'dateOfBirth',
                  'fullAddress',
                  'state',
                  'pinCode',
                  'qualification',
                  'collegeUniversity',
                  'pursuingLLB',
                  'yearOfPassing',
                  'email',
                  'fatherName',
                  'motherName',
                  'permanentAddress',
                  'permanentState',
                  'permanentCity',
                  'aadharCard', // Ensure this key matches the data structure
                  'feesPaid',
                  'amountPaid',
                  'oldStudentOfShubhamSir',
                  'institution',
                ].map((field, i) => (
                  <td key={i} className="py-2 px-4">
                    {editMode === data._id ? (
                      // Show input for editing
                      <input
                        type="text"
                        name={field}
                        value={editData[data._id]?.[field] || ''}
                        onChange={(e) => handleChange(e, data._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : field === 'photo' ? (
                      // Display the image for the 'Choose Picture' field
                      <img
                        src={data[field]}
                        alt="Empowerment"
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      // Display the field value normally
                      data[field]
                    )}
                  </td>
                ))}
                <td className="py-2 px-4">
                  {editMode === data._id ? (
                    <>
                      <button
                        onClick={() => updateData(data._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(null);
                          setEditData({});
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className='flex gap-2'>
                      <button
                        onClick={() => toggleEditMode(data._id)}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteData(data._id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-1 items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center">
          {getPaginationNumbers().map((num, index) => (
            <button
              key={index}
              onClick={() => {
                if (typeof num === 'number') {
                  handlePageChange(num);
                }
              }}
              className={`mx-1 px-2 py-1 rounded ${num === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmpowermentForm;
