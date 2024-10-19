import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import SummaryApi from '../Common/SummaryApi';

const SyllabusUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [syllabusList, setSyllabusList] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchSyllabus = async () => {
    try {
      const response = await axios({
        url: SummaryApi.Syllabus.url,
        method: SummaryApi.Syllabus.method,
      });
      setSyllabusList(response.data.data);
    } catch (error) {
      console.error('Error fetching syllabuses:', error);
      setError('Error fetching syllabuses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios({
        url: SummaryApi.SyllabusdataUploads.url,
        method: SummaryApi.SyllabusdataUploads.method,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchSyllabus();
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading syllabus:', error);
      setError('Error uploading syllabus');
    }
  };

  const updateSyllabus = async (id) => {
    if (!updatedTitle) {
      setError('Title is required for update');
      return;
    }

    const apiUrl = SummaryApi.SyllabusUpdate.url.replace(':id', id);
    const formData = new FormData();
    formData.append('title', updatedTitle);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.put(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchSyllabus();
      resetEdit();
    } catch (error) {
      console.error('Error updating syllabus:', error);
      setError('Error updating syllabus');
    }
  };

  const deleteSyllabus = async (id) => {
    if (window.confirm('Are you sure you want to delete this syllabus?')) {
      const apiUrl = SummaryApi.SyllabusDelete.url.replace(':id', id);
      try {
        await axios.delete(apiUrl);
        fetchSyllabus();
      } catch (error) {
        console.error('Error deleting syllabus:', error);
        setError('Error deleting syllabus');
      }
    }
  };

  const resetEdit = () => {
    setEditId(null);
    setUpdatedTitle('');
    setFile(null);
    setError(''); // Clear error on reset
  };

  const indexOfLastSyllabus = currentPage * itemsPerPage;
  const indexOfFirstSyllabus = indexOfLastSyllabus - itemsPerPage;
  const currentSyllabuses = syllabusList.slice(
    indexOfFirstSyllabus,
    indexOfLastSyllabus
  );
  const totalPages = Math.ceil(syllabusList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  return (
    <div className="mx-auto p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-4 text-[#1F2937] text-center">
          Upload PDF's
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          placeholder="Title"
          value={editId ? updatedTitle : title}
          required
          onChange={(e) =>
            editId ? setUpdatedTitle(e.target.value) : setTitle(e.target.value)
          }
        />
        <input
          type="file"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="flex justify-center">
          <button
            className="bg-[#1F2937] text-white p-2 rounded hover:bg-gray-800 w-full"
            type="submit"
          >
            {editId ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#1F2937]">
          Uploaded Syllabus List
        </h2>
        <table className="w-full table-auto border-collapse border border-[#1F2937]">
          <thead>
            <tr className="bg-[#1F2937] text-white">
              <th className="border border-[#1F2937] p-2">S.No</th>
              <th className="border border-[#1F2937] p-2">Title</th>
              <th className="border border-[#1F2937] p-2">File Name</th>
              <th className="border border-[#1F2937] p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSyllabuses.map((syllabus, index) => (
              <tr key={syllabus._id} className="text-center">
                <td className="border border-[#1F2937] p-2">
                  {index + 1 + indexOfFirstSyllabus}
                </td>
                <td className="border border-[#1F2937] p-2">
                  {editId === syllabus._id ? (
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded p-2 w-full"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  ) : (
                    syllabus.title
                  )}
                </td>
                <td className="border border-[#1F2937] p-2">{syllabus.pdf}</td>
                <td className="border border-[#1F2937] p-2 flex justify-center">
                  {editId === syllabus._id ? (
                    <>
                      <button
                        onClick={() => updateSyllabus(syllabus._id)}
                        className="px-3 py-1 rounded flex items-center"
                      >
                        <FaSave className="text-green-500 hover:text-green-700" />
                      </button>
                      <button
                        onClick={resetEdit}
                        className="px-3 py-1 rounded flex items-center"
                      >
                        <FaTimes className="text-red-500 hover:text-red-700" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(syllabus._id);
                          setUpdatedTitle(syllabus.title);
                        }}
                        className="px-3 py-1 rounded flex items-center"
                      >
                        <FaEdit className="text-blue-500 hover:text-blue-800" />
                      </button>
                      <button
                        onClick={() => deleteSyllabus(syllabus._id)}
                        className="px-3 py-1 rounded flex items-center"
                      >
                        <FaTrash className="text-red-500 hover:text-red-700" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyllabusUpload;
