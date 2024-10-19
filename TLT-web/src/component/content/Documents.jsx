import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Documents = ({ files, handleFileChange }) => {
  const navigate = useNavigate();
  const [photoAlert, setPhotoAlert] = useState(false);
  const [aadharAlert, setAadharAlert] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    
    // Log the file inputs to see what is captured
    console.log("Current Form files:", files);
  
    setPhotoAlert(!files.photo);
    setAadharAlert(!files.adhaarPhoto);
  
    // Create a new FormData object to check the form submission
    const formData = new FormData();
    if (files.photo) {
      formData.append('photo', files.photo);
    }
    if (files.adhaarPhoto) {
      formData.append('adhaarPhoto', files.adhaarPhoto);
    }
  
    // Log the FormData content
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    // Only navigate if both files are uploaded
    if (files.photo && files.adhaarPhoto) {
      // At this point, you should submit formData to your backend to store the images
      navigate("/jet/educational");
    } else {
      alert("Please upload all required documents");
    }
  };
  
  return (
    <div className="flex w-full h-full sm:pl-[120px] sm:mt-24  lg:mt-0 md:lg-0 mt-24 mb-10">
      <div className="w-full sm:w-[60%] p-4 pl-[0px]">
        <h1 className="text-3xl font-bold mb-2 text-primary-marineBlue">
          Document Upload
        </h1>

        <div className="flex flex-col relative space-y-4">
          <div className="flex flex-wrap pt-4">
            <div className="flex flex-col w-full mb-5">
              <label className="text-primary-marineBlue font-medium mb-2">
                Upload Photo
              </label>
              <input
                onChange={handleFileChange}
                className={`jinput ${
                  photoAlert ? "focus:outline-primary-strawberryRed" : "focus:outline-primary-marineBlue"
                } outline outline-1 outline-neutral-lightGray h-7`}
                type="file"
                accept="image/*"
                name="photo"
                aria-required="true"
              />
              {photoAlert && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap pt-4">
            <div className="flex flex-col w-full mb-5">
              <label className="text-primary-marineBlue font-medium mb-2">
                Upload Aadhar
              </label>
              <input
                onChange={handleFileChange}
                className={`jinput ${
                  aadharAlert ? "focus:outline-primary-strawberryRed" : "focus:outline-primary-marineBlue"
                } mb-6 outline outline-1 outline-neutral-lightGray h-7`}
                type="file"
                accept="application/pdf,image/*"
                name="adhaarPhoto"
                aria-required="true"
              />
              {aadharAlert && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-[20px] sm:pt-[35px]">
            <button
              type="button"
              className="text-neutral-coolGray font-medium capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
              onClick={() => navigate("/jet/guardiandetails")}
            >
              Go back
            </button>

            <button
              className="bg-primary lg:mr-16 text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
              onClick={handleNext}
              type="button"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
