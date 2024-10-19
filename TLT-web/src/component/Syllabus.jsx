import React from 'react';
import Headings from './utiliti/heading/Heading';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SyllabusModel from './SyllabusModel';
import SummaryApi from '../Common/SummaryAPI';
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const Syllabus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syllabus, setSyllabus] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null); // State for the selected PDF

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios({
      url: SummaryApi.Syllabus.url,
      method: SummaryApi.Syllabus.method,
    }); //backend
    console.log(result.data.data);
    setSyllabus(result.data.data);
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
      link.href = `${backendDomain}/SyllabusUploadFiles/${pdf}`;
      link.download = pdf;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No PDF file available to download.');
    }
  };

  // const showPdf = (pdf) => {
  //   const pdfBaseUrl = SummaryApi.Syllabuspdf.baseUrl; // Get the base URL for PDF files
  //   const url = `${pdfBaseUrl}/${pdf}`; // Construct the full URL
  //   window.open(url, '_blank', 'noreferrer');
  // };

  return (
    <div className="px-5 md:px-20 py-8">
      <Headings heading={'h2'} style="text-center">
        Sylla<span className="text-primary">bus</span>
      </Headings>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-10">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">SR</th>
              <th className="py-3 px-5 text-left">Name of Bare Act</th>
              <th className="py-3 px-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {syllabus == null
              ? ''
              : syllabus.map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 border-b border-gray-200"
                  >
                    <td className="py-3 px-5">{index + 1}</td>
                    <td className="py-3 px-5">{data.title}</td>
                    <td className="py-3 px-5">
                      <a
                        // href={data.pdf}
                        target="_blank"
                        download
                        className="bg-primary text-white py-1 px-4 rounded hover:bg-red-700"
                        onClick={() => handleBuyNowClick(data.pdf)}
                      >
                        Download
                      </a>
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
                  <SyllabusModel
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

export default Syllabus;
