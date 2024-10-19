// StudentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import * as XLSX from 'xlsx';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getStudents');
      setStudents(response.data);
    } catch (err) {
      toast.error('Failed to fetch students');
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:8080/api/deleteStudent/${id}`);
        toast.success('Student deleted successfully!');
        fetchStudents();
      } catch (err) {
        toast.error('Error deleting student');
      }
    }
  };

  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [e.target.name]: e.target.value },
    });
  };

  const updateStudent = async (id) => {
    if (window.confirm('Are you sure you want to update this student?')) {
      try {
        await axios.put(`http://localhost:8080/api/updateStudent/${id}`, editData[id]);
        setEditMode(null); // Exit edit mode
        fetchStudents(); // Fetch updated data
        toast.success('Student updated successfully!');
      } catch (err) {
        toast.error('Error updating student');
      }
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    setEditData({ [id]: students.find((student) => student._id === id) });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(students);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Data');
    XLSX.writeFile(workbook, 'student_data.xlsx');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Student List</h2>
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>
      <div>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="shadow-md rounded-lg border-b border-gray-200">
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4 text-left">S.No</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Batch</th>
                  <th className="py-2 px-4 text-left">Course</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Sign-In Time</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100`}
                    key={student._id}
                  >
                    <td className="py-2 px-4 text-gray-600">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === student._id ? (
                        <input
                          type="text"
                          name="name"
                          value={editData[student._id]?.name || ''}
                          onChange={(e) => handleChange(e, student._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === student._id ? (
                        <input
                          type="text"
                          name="batch"
                          value={editData[student._id]?.batch || ''}
                          onChange={(e) => handleChange(e, student._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        student.batch
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">
                      {editMode === student._id ? (
                        <input
                          type="text"    
                          name="course"
                          value={editData[student._id]?.course || ''}
                          onChange={(e) => handleChange(e, student._id)}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        student.course
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600">{student.email}</td>
                    <td className="py-2 px-4 text-gray-600">
                      {moment(student.signInTime).format('LL')}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      {editMode === student._id ? (
                        <>
                          <button
                            onClick={() => updateStudent(student._id)}
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
                            onClick={() => toggleEditMode(student._id)}
                            className="text-blue-500 px-3 py-1 rounded hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteStudent(student._id)}
                            className="text-red-500 px-3 py-1 rounded hover:text-red-700"
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

            {/* Pagination controls */}
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
                }`}
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

export default StudentList;
