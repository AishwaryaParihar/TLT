import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Educational = ({ formData, handleChange, files }) => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const { degree, college, graduationYear, masterGraduationYear, masterUniversityAndDegree } = formData;
    if (degree && college && graduationYear && masterGraduationYear && masterUniversityAndDegree) {
      console.log("Form data before navigation:", formData);
      navigate("/jet/consent");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex row w-full h-full sm:pl-[100px] sm:mt-24  lg:mt-0 md:lg-0 mt-24 mb-10">
      <div className="w-full sm:w-[60%] p-4">
        <h1 className=" text-3xl font-bold mb-10 text-primary-marineBlue">
          Educational Details
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
            {/* ------- Graduation/Degree in: -------- */}
            <div className="flex flex-col w-full sm:w-[60%]">
              <label className="text-primary-marineBlue font-medium mb-2">
                Graduation/Degree in:
              </label>
              <input
              name="degree"
                value={formData.degree || ""}
                onChange={handleChange}
                className={`jinput ${formData.degree || !hasSubmitted ? "focus:outline-primary-marineBlue" : "focus:outline-primary-strawberryRed"} outline outline-1 outline-neutral-lightGray rounded-md p-3 mb-1`}
                type="text"
                placeholder="Degree"
              />
              {(!formData.degree && hasSubmitted) && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>
            {/* ------- College/University:--------- */}
            <div className="flex flex-col w-full sm:w-[60%]">
              <label className="text-primary-marineBlue font-medium mb-2">
                College/University:
              </label>
              <input
              name="college"
                value={formData.college || ""}
                onChange={handleChange}
                className={`jinput ${formData.college || !hasSubmitted ? "focus:outline-primary-marineBlue" : "focus:outline-primary-strawberryRed"} outline outline-1 outline-neutral-lightGray rounded-md p-3 mb-1`}
                type="text"
                placeholder="College/University"
              />
              {(!formData.college && hasSubmitted) && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
            {/* ------- Graduation year: -------- */}
            <div className="flex flex-col w-full sm:w-[60%]">
              <label className="text-primary-marineBlue font-medium mb-2">
                Graduation year:
              </label>
              <input
               name="graduationYear"
                value={formData.graduationYear || ""}
                onChange={handleChange}
                className={`jinput ${formData.graduationYear || !hasSubmitted ? "focus:outline-primary-marineBlue" : "focus:outline-primary-strawberryRed"} outline outline-1 outline-neutral-lightGray rounded-md p-3 mb-1`}
                type="text"
                placeholder="Graduation year"
              />
              {(!formData.graduationYear && hasSubmitted) && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>
            {/* ------- Master Graduation year:--------- */}
            <div className="flex flex-col w-full sm:w-[60%]">
              <label className="text-primary-marineBlue font-medium mb-2">
                Master Graduation year:
              </label>
              <input
              name="masterGraduationYear"
                value={formData.masterGraduationYear || ""}
                onChange={handleChange}
                className={`jinput ${formData.masterGraduationYear || !hasSubmitted ? "focus:outline-primary-marineBlue" : "focus:outline-primary-strawberryRed"} outline outline-1 outline-neutral-lightGray rounded-md p-3 mb-1`}
                type="text"
                placeholder="Master Graduation year"
              />
              {(!formData.masterGraduationYear && hasSubmitted) && (
                <span className="text-primary-strawberryRed font-medium">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* ------- Master's University and Degree: -------- */}
          <div className="flex flex-col w-full mb-8">
            <label className="text-primary-marineBlue font-medium mb-2">
              Master's University and Degree in:
            </label>
            <input
            name="masterUniversityAndDegree"
              value={formData.masterUniversityAndDegree || ""}
              onChange={handleChange}
              className={`jinput ${formData.masterUniversityAndDegree || !hasSubmitted ? "focus:outline-primary-marineBlue" : "focus:outline-primary-strawberryRed"} outline outline-1 outline-neutral-lightGray rounded-md p-3 mb-1`}
              type="text"
              placeholder="Master's University and Degree"
            />
            {(!formData.masterUniversityAndDegree && hasSubmitted) && (
              <span className="text-primary-strawberryRed font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/jet/documents")}
              className="text-neutral-coolGray font-medium capitalize transition-all duration-300 hover:text-primary-marineBlue"
            >
              Go back
            </button>

            <button
              className="bg-primary text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
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

export default Educational;
