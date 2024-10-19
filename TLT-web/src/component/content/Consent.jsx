import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../Common/SummaryAPI";



const Consent = ({ formData = {}, files = {}, handleChange }) => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      // Append form data fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
  
      // Append file fields
      formDataToSend.append('photo', files.photo);
      formDataToSend.append('adhaarPhoto', files.adhaarPhoto);
  
      // Make the POST request to your backend
      const response = await axios( {
        url:SummaryApi.JetForm.url,
        method: SummaryApi.JetForm.method,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data:formDataToSend
      });
  
      if (response.status === 201) {
        // Navigate to Thank You page after successful submission
        navigate("/jet/thankyou");
      } else {
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form.');
    }
  };
  

  return (
    <div className="flex w-full h-full sm:pl-[120px] sm:mt-24  lg:mt-0 md:lg-0 mt-24 mb-10">
      <div className="w-full sm:w-[60%] p-4">
        <h1 className="text-3xl font-bold mb-2 text-primary-marineBlue">
          Consent
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col mt-10">
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Annual Income */}
            <div className="flex flex-col w-full sm:w-[100%]">
              <label className="text-primary-marineBlue font-medium mb-2">
                Annual Income:
              </label>
              <input
                name="annualIncome"
                onChange={handleChange}
                value={formData.annualIncome}
                className={`input ${
                  hasSubmitted && !formData.annualIncome
                    ? "focus:outline-primary-strawberryRed"
                    : "focus:outline-primary-marineBlue"
                } outline outline-1 outline-neutral-lightGray rounded-md p-3 mb-1`}
                type="text"
                placeholder="Annual Income"
                aria-required="true"
              />
              {hasSubmitted && !formData.annualIncome && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>

            {/* Required Assistance */}
            <div className="flex justify-center flex-col w-full sm:w-[100%]">
              <p className="text-primary-marineBlue font-medium mb-2">
                Required Assistance for accommodation on Selection? :
              </p>
              <div className="flex">
                <label className="flex justify-center items-center text-primary-marineBlue font-medium mb-2">
                  <input
                    onChange={handleChange}
                    className={`input mr-2 ${
                      hasSubmitted && !formData.accomodationRequirement
                        ? "focus:outline-primary-strawberryRed"
                        : "focus:outline-primary-marineBlue"
                    }`}
                    type="radio"
                    name="accomodationRequirement"
                    value="yes"
                    checked={formData.accomodationRequirement === "yes"}
                    aria-required="true"
                  />
                  Yes
                </label>

                <label className="flex justify-center items-center text-primary-marineBlue font-medium mb-2 ml-5">
                  <input
                    onChange={handleChange}
                    className={`input mr-2 ${
                      hasSubmitted && !formData.accomodationRequirement
                        ? "focus:outline-primary-strawberryRed"
                        : "focus:outline-primary-marineBlue"
                    }`}
                    type="radio"
                    name="accomodationRequirement"
                    value="no"
                    checked={formData.accomodationRequirement === "no"}
                    aria-required="true"
                  />
                  No
                </label>

                {hasSubmitted && !formData.accomodationRequirement && (
                  <span className="text-primary-strawberryRed font-medium">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-around sm:justify-between items-center pt-[7px] sm:pt-[29px]">
            <button
              type="button"
              onClick={() => navigate("/jet/educational")}
              className="text-neutral-coolGray font-medium capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
            >
              Go back
            </button>

            <button
              type="submit"
              className="bg-primary mr-16 text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Consent;
