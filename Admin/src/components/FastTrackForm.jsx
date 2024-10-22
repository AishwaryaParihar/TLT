import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryApi from '../Common/SummaryApi';
import { FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa'; // Ensure you import the icons
import * as XLSX from 'xlsx';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const FastTrackForm = () => {
  const [fastTrackData, setFastTrackData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios(SummaryApi.FastTractFormAdmin);
        const fetchedData = result.data.fastTrackFormData || [];

        // Sort the data by the createdAt field in descending order (most recent first)
        const sortedData = fetchedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        setFastTrackData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFastTrackData([]);
      }
    };
    getData();
  }, []);

  const deleteData = async (id) => {
    try {
      await axios({
        ...SummaryApi.FastTractFormAdminDelete,
        url: SummaryApi.FastTractFormAdminDelete.url.replace(':id', id),
      });
      setFastTrackData(fastTrackData.filter((data) => data._id !== id));
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
        ...SummaryApi.FastTractFormAdminUpdate,
        url: SummaryApi.FastTractFormAdminUpdate.url.replace(':id', id),
        data: editData[id],
      });
      setEditMode(null);
      setFastTrackData((prevData) =>
        prevData.map((item) => (item._id === id ? editData[id] : item))
      );
      setEditData({}); // Reset editData
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    const selectedData = fastTrackData.find((data) => data._id === id);
    setEditData({ [id]: selectedData });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentForms = fastTrackData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(fastTrackData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Export to Excel function
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(fastTrackData); // Convert data to worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fast Track Data'); // Add worksheet to workbook
    XLSX.writeFile(workbook, 'fastTrack_data.xlsx'); // Trigger the file download
  };

  // Navigate to profile page
  // const viewProfile = (id) => {
  //   navigate(`/profile/${id}`); // Navigate to the profile page with the student's ID
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Fast-Track Form Data</h1>

      {/* Export to Excel Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>

      {fastTrackData.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              {[
                'S.no',
                'Batch',
                'Picture',
                'Aadhar Card',
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
                'Permanent State',
                'Permanent City',
                'Fees Paid',
                'Amount Paid',
                'Prelims',
                'Mains',
                'Targeted State',
                'Score',
                'Year',
                'Old Student',
                'Institution',
                'Actions',
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
                <td className="py-2 px-4">
                  {editMode === data._id ? (
                    <input
                      type="file"
                      name="picture"
                      onChange={(e) => handleChange(e, data._id)}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <img
                      src={`${baseUrl}/${data.picture}`}
                      alt="User"
                      className="w-24 h-24 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  {editMode === data._id ? (
                    <input
                      type="file"
                      name="aadharCard"
                      onChange={(e) => handleChange(e, data._id)}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <img
                      src={`${baseUrl}/${data.aadharCard}`}
                      alt="User"
                      className="w-24 h-24 object-cover"
                    />
                  )}
                </td>
                {[
                  'name',
                  'batch',
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
                  'feesPaid',
                  'amountPaid',
                  'prelims',
                  'mains',
                  'targetedstate',
                  'score',
                  'year',
                  'oldStudentOfShubhamSir',
                  'institution',
                ].map((field, i) => (
                  <td key={i} className="py-2 px-4">
                    {editMode === data._id ? (
                      <input
                        type={field === 'dateOfBirth' ? 'date' : 'text'}
                        name={field}
                        value={editData[data._id]?.[field] || ''}
                        onChange={(e) => handleChange(e, data._id)}
                        className="w-full p-2 border rounded"
                      />
                    ) : field === 'dateOfBirth' ? (
                      new Date(data[field]).toLocaleDateString()
                    ) : (
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
                        <FaTrashAlt className="text-red-500 hover:text-red-800" />
                      </button>
                      <Link to={`/dashboard/${data._id}`}>
                        <button className="px-3 py-1 rounded flex items-center">
                          <FaUser className="text-green-500 hover:text-green-800" />
                        </button>
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-1 px-3 rounded"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mr-2 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 hover:bg-gray-400 text-black'
            } font-bold py-1 px-3 rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-1 px-3 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FastTrackForm;
