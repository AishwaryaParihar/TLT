import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SummaryApi from '../Common/SummaryApi';
import * as XLSX from 'xlsx';
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const JetFormDetails = () => {
  const [formData, setFormData] = useState([]);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios({
        url: SummaryApi.JetFormGet.url,
        method: SummaryApi.JetFormGet.method,
      });
      setFormData(result.data.jetForms);
    } catch (error) {
      toast.error('Error fetching data.');
    }
  };

  const deleteForm = async (id) => {
    try {
      const urldata = SummaryApi.JetFormDelete.url.replace(':id', id);
      await axios({
        url: urldata,
        method: SummaryApi.JetFormDelete.method,
      });
      toast.success('Form deleted successfully.');
      fetchData();
    } catch (error) {
      toast.error('Error deleting form.');
    }
  };

  const handleChange = (e, id) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [e.target.name]: e.target.value },
    });
  };

  const updateForm = async (id) => {
    try {
      await axios({
        url: SummaryApi.JetFormUpdate.url.replace(':id', id),
        method: SummaryApi.JetFormUpdate.method,
        data: editData[id],
      });
      toast.success('Form updated successfully.');
      setEditMode(null);
      fetchData();
    } catch (error) {
      toast.error('Error updating form.');
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    setEditData({ [id]: formData.find((data) => data._id === id) });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentForms = formData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(formData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Export to Excel function
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formData); // Convert data to worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jet Form Data'); // Add worksheet to workbook
    XLSX.writeFile(workbook, 'jetform_data.xlsx'); // Trigger the file download
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Jet Forms</h2>

      {/* Export to Excel Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Export to Excel
      </button>

      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">S.No.</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Contact No</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">DOB</th>
            <th className="p-3 text-left">State</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Guardian Name</th>
            <th className="p-3 text-left">Guardian Profession</th>
            <th className="p-3 text-left">Degree</th>
            <th className="p-3 text-left">College</th>
            <th className="p-3 text-left">Graduation Year</th>
            <th className="p-3 text-left">Master Graduation Year</th>
            <th className="p-3 text-left">Master University & Degree</th>
            <th className="p-3 text-left">Annual Income</th>
            <th className="p-3 text-left">Accommodation Requirement</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Aadhaar Photo</th>
            <th className="p-3 text-left">Created Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form, index) => (
            <tr
              key={form._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData[form._id]?.name || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.name
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editData[form._id]?.email || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.email
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="number"
                    value={editData[form._id]?.number || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.number
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="category"
                    value={editData[form._id]?.category || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.category
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="address"
                    value={editData[form._id]?.address || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.address
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="date"
                    name="dob"
                    value={editData[form._id]?.dob || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  moment(form.dob).format('YYYY-MM-DD')
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="state"
                    value={editData[form._id]?.state || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.state
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="city"
                    value={editData[form._id]?.city || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.city
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="gender"
                    value={editData[form._id]?.gender || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.gender
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="guardianName"
                    value={editData[form._id]?.guardianName || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.guardianName
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="guardianProfession"
                    value={editData[form._id]?.guardianProfession || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.guardianProfession
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="degree"
                    value={editData[form._id]?.degree || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.degree
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="college"
                    value={editData[form._id]?.college || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.college
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="graduationYear"
                    value={editData[form._id]?.graduationYear || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.graduationYear
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="masterGraduationYear"
                    value={editData[form._id]?.masterGraduationYear || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.masterGraduationYear
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="masterUniversityAndDegree"
                    value={editData[form._id]?.masterUniversityAndDegree || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.masterUniversityAndDegree
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="number"
                    name="annualIncome"
                    value={editData[form._id]?.annualIncome || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.annualIncome
                )}
              </td>
              <td className="p-3">
                {editMode === form._id ? (
                  <input
                    type="text"
                    name="accomodationRequirement"
                    value={editData[form._id]?.accomodationRequirement || ''}
                    onChange={(e) => handleChange(e, form._id)}
                    className="border rounded p-1"
                  />
                ) : (
                  form.accomodationRequirement
                )}
              </td>
              <td className="p-3">
                <img
                  className="w-[100px] h-[100px]"
                  src={`${baseUrl}/${form.photo}`}
                />
                {form.photo && (
                  <a
                    href={`${baseUrl}/${form.photo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Photo
                  </a>
                )}
              </td>
              <td className="p-3">
              <img
                  className="w-[100px] h-[100px]"
                  src={`${baseUrl}/${form.adhaarPhoto}`}
                />
                {form.adhaarPhoto && (
                  <a
                    href={`${baseUrl}/${form.adhaarPhoto}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Aadhaar Photo
                  </a>
                )}
              </td>
              {/* Created date */}
              <td className="p-3">
                {moment(form.createdAt).format('YYYY-MM-DD')}
              </td>

              {/* Actions */}
              <td className="p-3">
                {editMode === form._id ? (
                  <div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => updateForm(form._id)}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => toggleEditMode(form._id)}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => deleteForm(form._id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-gray-800 text-white'
                : 'bg-gray-300'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JetFormDetails;
