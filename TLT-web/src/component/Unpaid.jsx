import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../Common/SummaryAPI';
import UnpaidModal from './UnpaidModal';
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const Unpaid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unpaidFiles, setUnpaidFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null); // State for the selected PDF

  useEffect(() => {
    fetchUnpaidFiles();
  }, []);

  const fetchUnpaidFiles = async () => {
    try {
      const result = await axios({
        url: SummaryApi.getUnpaid.url,
        method: SummaryApi.getUnpaid.method,
      });
      setUnpaidFiles(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      // console.error('Error fetching unpaid files:', error);
      console.log("error", error)
    }
  };

  const handleBuyNowClick = (pdf) => {
    setSelectedPdf(pdf); // Set the selected PDF
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const triggerDownload = (pdf) => {
    if (pdf) {
      const link = document.createElement('a');
      link.href = `${backendDomain}/unpaidProductUploadFiles/${pdf}`;
      link.download = pdf;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No PDF file available to download.');
    }
  };

  // const showPdf = (pdf) => {
  //   window.open(
  //     `http://localhost:5054/api/UnpaidFiles/${pdf}`,
  //     '_blank',
  //     'noreferrer'
  //   );
  // };

  return (
    <div className="px-5 md:px-20 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Unpaid Files</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-10">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">SR</th>
              <th className="py-3 px-5 text-left">Title</th>
              <th className="py-3 px-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {unpaidFiles.map((file, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 border-b border-gray-200"
              >
                <td className="py-3 px-5">{index + 1}</td>
                <td className="py-3 px-5">{file.title}</td>
                <td className="py-3 px-5">
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                    onClick={() => handleBuyNowClick(file.pdf)}
                  >
             Download
                  </button>
                </td>
              </tr>
            ))}

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                <div className="bg-white p-3 rounded-lg w-96 bg-opacity-100">
                  <button
                    className="absolute text-3xl font-bold text-black"
                    onClick={handleCloseModal}
                  >
                    X
                  </button>
                  <UnpaidModal
                    onFormSubmit={() => {
                      triggerDownload(selectedPdf); // Trigger the download when the form is submitted
                      handleCloseModal(); // Close the modal
                    }}
                  />
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Unpaid;
