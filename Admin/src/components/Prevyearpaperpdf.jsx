import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../Common/SummaryApi';

const PrevYearPaperUpload = () => {
  const [title, setTitle] = useState('');
  const [pdf, setpdf] = useState(null);
  const [file, setFile] = useState(null);
  const [paperList, setPaperList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success messages
  const [editId, setEditId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page

  const fetchPapers = async (page = 1) => {
    try {
      const urldata = `${SummaryApi.GetPyPaperPDFupload.url}?page=${page}&limit=${itemsPerPage}`;

      const response = await axios({
        url: urldata,
        method: SummaryApi.GetPyPaperPDFupload.method,
      });

      // Set the fetched data into your state
      setPaperList(response.data.data);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage)); // Calculate total pages
    } catch (error) {
      console.error('Error fetching previous year papers:', error);
      setError('Error fetching previous year papers');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Papertitle', title);
    formData.append('paperimage', file);
    formData.append('pdf', pdf);

    try {
      await axios({
        url: SummaryApi.PyPaperPDFUploads.url,
        method: SummaryApi.PyPaperPDFUploads.method,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchPapers(currentPage);
      setSuccess('Successfully uploaded previous year paper!'); // Success message
      setTitle('');
      setpdf(null);
      setFile(null);
    } catch (error) {
      console.error('Error uploading previous year paper:', error);
      setError('Error uploading previous year paper');
    }
  };

  const updatePaper = async (id) => {
    if (!updatedTitle) {
      setError('Title is required for update');
      return;
    }

    const apiUrl = SummaryApi.PyPaperPDFUpdate.url.replace(':id', id);

    const formData = new FormData();
    formData.append('paperimage', updatedTitle);
    if ((file, pdf)) {
      formData.append('paperimage', file);
      formData.append('pdf', pdf);
    }

    try {
      await axios.put(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchPapers(currentPage);
      resetEdit();
      setSuccess('Successfully updated previous year paper!'); // Success message
    } catch (error) {
      console.error('Error updating previous year paper:', error);
      setError('Error updating previous year paper');
    }
  };

  const deletePaper = async (id) => {
    const apiUrl = SummaryApi.PyPaperPDFDelete.url.replace(':id', id);

    try {
      await axios.delete(apiUrl);
      fetchPapers(currentPage);
      setSuccess('Successfully deleted previous year paper!'); // Success message
    } catch (error) {
      console.error('Error deleting previous year paper:', error);
      setError('Error deleting previous year paper');
    }
  };

  const resetEdit = () => {
    setEditId(null);
    setUpdatedTitle('');
    setFile(null);
    setpdf(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPapers(page);
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="mx-auto p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md mx-auto"
      >
        <h1 className="text-2xl font-bold mb-4 text-[#1F2937] text-center">
          Upload Previous Year Paper (PDF)
        </h1>
        <input
          type="text"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          placeholder="Title"
          value={editId ? updatedTitle : title}
          required
          name="Papertitle"
          onChange={(e) =>
            editId ? setUpdatedTitle(e.target.value) : setTitle(e.target.value)
          }
        />
        <label className="font-semibold text-red-600" htmlFor="paperimage">
          Product Image :{' '}
        </label>
        <input
          type="file"
          name="paperimage"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label className="font-semibold text-red-600" htmlFor="pdf">
          Product (in pdf)
        </label>
        <input
          type="file"
          name="pdf"
          className="form-control border border-gray-300 rounded p-2 mb-3 w-full"
          accept="application/pdf"
          onChange={(e) => setpdf(e.target.files[0])}
        />
        <div
          className="flex 
        justify-center"
        >
          <button
            className="bg-[#1F2937] text-white p-2 rounded hover:bg-gray-800 w-full"
            type="submit"
          >
            {editId ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
      {success && <p className="text-green-500">{success}</p>}{' '}
      {/* Success alert */}
      {error && <p className="text-red-500">{error}</p>} {/* Error alert */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#1F2937]">
          Uploaded Previous Year Papers
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
            {paperList.map((paper, index) => (
              <tr key={paper._id} className="text-center">
                <td className="border border-[#1F2937] p-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="border border-[#1F2937] p-2">
                  {editId === paper._id ? (
                    <input
                      type="text"
                      className="form-control border border-gray-300 rounded p-2 w-full"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                  ) : (
                    paper.title
                  )}
                </td>
                <td className="border border-[#1F2937] p-2">{paper.pdf}</td>
                <td className="border border-[#1F2937] p-2">
                  {editId === paper._id ? (
                    <>
                      <button
                        className="bg-green-500 text-white p-1 rounded mr-2"
                        onClick={() => updatePaper(paper._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white p-1 rounded"
                        onClick={resetEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white p-1 rounded mr-2"
                        onClick={() => {
                          setEditId(paper._id);
                          setUpdatedTitle(paper.title);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white p-1 rounded"
                        onClick={() => deletePaper(paper._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2 mt-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`py-1 px-3 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevYearPaperUpload;
