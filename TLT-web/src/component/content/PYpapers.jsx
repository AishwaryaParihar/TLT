import React, { useEffect, useState } from 'react';
import PYpaperform from './PYpaperform';
import Headings from '../utiliti/heading/Heading';
import axios from 'axios';
import SummaryApi from '../../Common/SummaryAPI';
const backendDomain = import.meta.env.VITE_BACKEND_URL;

export const PYpapers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pydata, setPydata] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null); // State for the selected PDF

  useEffect(() => {
    getPy();
  }, []); // Add the dependency array to prevent infinite loops

  const getPy = async () => {
    const result = await axios({
      url: SummaryApi.getPyPaperPDFupload.url,
      method: SummaryApi.getPyPaperPDFupload.method,
    });
    setPydata(result.data.data);
    console.log(result.data.data);
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
      link.href = `${backendDomain}/prevYearPDFuploadUpload/${pdf}`;
      link.download = pdf;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No PDF file available to download.');
    }
  };

  return (
    <>
      <div className="flex justify-center flex-col text-center flex-wrap gap-12 my-8">
        <Headings heading={'h2'}>
          Previous <span className="text-primary"> Year Papers</span>
        </Headings>

        <div className="flex justify-center flex-wrap gap-12 my-8">
          {pydata == null
            ? ''
            : pydata.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-content-center items-center text-center flex-col w-80 md:w-60"
                >
                  <div>
                    <img
                      src={`${backendDomain}/prevYearPDFuploadUpload/${item.paperimage}`}
                      className="w-80 md:w-60"
                      // alt={item.Papertitle}
                    />
                  </div>
                  <div className="text-lg font-medium opacity-75">
                    {item.Papertitle}
                  </div>
                  <button
                    className="text-sm font-bold text-white bg-primary px-2 py-1 mt-1 rounded-sm"
                    onClick={() => handleBuyNowClick(item.pdf)} // Open modal for the selected PDF
                  >
                    Download
                  </button>
                </div>
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
                <PYpaperform
                  onFormSubmit={() => {
                    triggerDownload(selectedPdf); // Trigger the download when the form is submitted
                    handleCloseModal(); // Close the modal
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
