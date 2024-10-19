import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import SummaryApi from '../Common/SummaryApi';

const UnpaidUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [unpaidList, setUnpaidList] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Items per page for pagination

  const fetchUnpaidFiles = async () => {
    try {
      const response = await axios({
        url:SummaryApi.GetUnpaidUpload.url,
        method:SummaryApi.GetUnpaidUpload.method
      });
      setUnpaidList(response.data.data);
    } catch (error) {
      console.error('Error fetching unpaid files:', error);
      setError('Error fetching unpaid files');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post(SummaryApi.UnpaidUpload.url, formData, { // Using SummaryApi for the POST request
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUnpaidFiles(); // Refresh the unpaid list after uploading
      setTitle('');
      setFile(null);
    }  catch (error) {
      console.error('Error uploading unpaid file:', error);
      setError('Error uploading unpaid file');
    }
  };

  const updateUnpaidFile = async (id) => {
  if (!updatedTitle) {
    setError('Title is required for update');
    return;
  }

  const apiUrl = SummaryApi.UpdateUnpaidById.url.replace(':id', id); // Replace ID in the URL
  const formData = new FormData();
  formData.append('title', updatedTitle);
  if (file) {
    formData.append('file', file);
  }

  try {
    await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchUnpaidFiles(); // Refresh the unpaid list after updating
    resetEdit();
  } catch (error) {
    console.error('Error updating unpaid file:', error);
    setError('Error updating unpaid file');
  }
};


const deleteUnpaidFile = async (id) => {
  const apiUrl = SummaryApi.DeleteUnpaidById.url.replace(':id', id); // Replace the :id parameter in the URL
  try {
    await axios.delete(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetchUnpaidFiles(); // Refresh the unpaid list after deleting
  } catch (error) {
    
    setError('Error deleting unpaid file');
  }
};


  const resetEdit = () => {
    setEditId(null);
    setUpdatedTitle('');
    setFile(null);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = unpaidList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(unpaidList.length / itemsPerPage);

  useEffect(() => {
    fetchUnpaidFiles();
  }, []);

  return (
    <div className="mx-auto p-5">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#1F2937] text-center">Upload Unpaid File</h1>
        <input
          type="text"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          placeholder="Title"
          value={editId ? updatedTitle : title}
          required
          onChange={(e) => (editId ? setUpdatedTitle(e.target.value) : setTitle(e.target.value))}
        />
        <input
          type="file"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="flex justify-center">
          <button className="bg-[#1F2937] text-white p-2 rounded hover:bg-gray-800 w-full" type="submit">
            {editId ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#1F2937]">Uploaded Unpaid Files</h2>
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
            {currentItems.map((unpaid, index) => (
              <tr key={unpaid._id} className="text-center">
                <td className="border border-[#1F2937] p-2">{indexOfFirstItem + index + 1}</td>
                <td className="border border-[#1F2937] p-2">
                  {editId === unpaid._id ? (
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded p-2 w-full"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  ) : (
                    unpaid.title
                  )}
                </td>
                <td className="border border-[#1F2937] p-2">{unpaid.pdf}</td>
                <td className="border border-[#1F2937] p-2 flex justify-center space-x-2">
                  {editId === unpaid._id ? (
                    <>
                      <button className="bg-green-500 text-white p-1 rounded mr-2" onClick={() => updateUnpaidFile(unpaid._id)}>
                        Save
                      </button>
                      <button className="bg-gray-500 text-white p-1 rounded" onClick={resetEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="p-1 rounded mr-2 flex items-center"
                        onClick={() => {
                          setEditId(unpaid._id);
                          setUpdatedTitle(unpaid.title);
                        }}
                      >
                        <FaEdit className="text-blue-500" />
                   
                      </button>
                      <button className=" p-1 rounded flex items-center" onClick={() => deleteUnpaidFile(unpaid._id)}>
                        <FaTrash className="text-red-500" />
                 
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 mx-1 border border-gray-300 rounded ${
                currentPage === pageNumber ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UnpaidUpload;
