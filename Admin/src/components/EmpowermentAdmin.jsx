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
        const fetchedData= result.data.data || [];
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
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
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
                    <>
                      <button
                        onClick={() => toggleEditMode(data._id)}
                        className="px-3 py-1 rounded flex items-center"
                      >
                        <FaEdit className="text-blue-500 hover:text-blue-800" />
                      </button>
                      <button
                        onClick={() => deleteData(data._id)}
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
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {[...Array(totalPages)].map((_, pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === pageNumber + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300'
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmpowermentForm;
