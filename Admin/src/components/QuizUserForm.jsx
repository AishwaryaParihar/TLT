import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SummaryApi from '../Common/SummaryApi';

const QuizUserForm = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 10; // Number of items per page
  const Toast = useToast();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(SummaryApi.QuizDetailsGet.url);
        const dataJson = await response.json();
        const sortedData = dataJson.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setData(sortedData);
        console.log('dataJson==>', sortedData);
      } catch (e) {
        Toast({
          title: 'Error occurred while fetching data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    getData();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items to display
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="shadow-md rounded-lg border-b border-gray-200">
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 text-left">S.no</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Phone Number</th>
            <th className="py-2 px-4 text-left">Score</th>
            <th className="py-2 px-4 text-left">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((obj, index) => (
            <tr key={index} className="p-2 m-2">
              <td className="border-2 m-2 p-2">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border-2 m-2 p-2">{obj.userName}</td>
              <td className="border-2 m-2 p-2">{obj.phoneNumber}</td>
              <td className="border-2 m-2 p-2">{obj.score || '2/5'}</td>
              <td className="border-2 m-2 p-2">
                {obj.createdAt.split('T')[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {currentPage > 2 && (
            <>
              <span
                onClick={() => handlePageChange(1)}
                className="cursor-pointer"
              >
                1
              </span>
              <span className="text-gray-500">...</span>
            </>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`cursor-pointer ${
                currentPage === index + 1
                  ? 'font-bold bg-blue-600 text-white px-2'
                  : ''
              }`}
            >
              {index + 1}
            </span>
          )).slice(Math.max(0, currentPage - 2), currentPage + 1)}
          {currentPage < totalPages - 1 && (
            <>
              <span className="text-gray-500">...</span>
              <span
                onClick={() => handlePageChange(totalPages)}
                className="cursor-pointer"
              >
                {totalPages}
              </span>
            </>
          )}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizUserForm;
