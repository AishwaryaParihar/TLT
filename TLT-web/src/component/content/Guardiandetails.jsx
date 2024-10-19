import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GuardianDetails = ({ formData, handleChange }) => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState({
    guardianName: false,
    guardianProfession: false,
  });


  const handleNext = (e) => {
    e.preventDefault();
    console.log("handleNext called");
    console.log("Current Form Data:", formData);

    const newAlerts = {
      guardianName: formData.guardianName === "",
      guardianProfession: formData.guardianProfession === "",
    };

    setAlerts(newAlerts);

    if (Object.values(newAlerts).some((alert) => alert)) {
      console.log("Validation errors found");
      return;
    }

    navigate("/jet/documents");
  };

  return (
    <div className="flex row w-full h-full sm:pl-[120px] sm:mt-24  lg:mt-0 md:lg-0 mt-24 mb-10">
      <div className="w-full sm:w-[60%] p-4 pl-[0px]">
        <h1 className="text-3xl font-bold mb-2 text-primary-marineBlue">
          Guardian details
        </h1>
        <div className="flex flex-col">
          <div className="form-wrapper flex flex-wrap flex-col relative">
            <div className="flex flex-wrap sm:flex-nowrap">
              <div className="flex flex-wrap sm:flex-nowrap w-[100%] sm:w-[50%] flex-col">
                <label className="flex text-primary-marineBlue font-[500] mb-2">
                  Guardian Name
                </label>
                <input
                  name="guardianName"
                  onChange={handleChange}
                  value={formData.guardianName|| ""}
                  className={`jinput ${
                    alerts.guardianName
                      ? "focus:outline-primary-strawberryRed"
                      : "focus:outline-primary-marineBlue"
                  } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                  type="text"
                  placeholder="e.g. Jane Doe"
                />
                <span
                  className={`${
                    alerts.guardianName ? "inline" : "hidden"
                  } text-primary-strawberryRed font-[500] text-sm`}
                >
                  This field is required
                </span>
              </div>
            </div>
            <div className="flex flex-wrap mt-1">
              <div className="flex flex-col w-[100%] sm:w-[50%]">
                <label className="text-primary-marineBlue font-[500] mb-0 sm:mb-2">
                  Guardian Profession
                </label>
                <input
                  name="guardianProfession"
                  onChange={handleChange}
                  value={formData.guardianProfession || ""}
                  className={`jinput ${
                    alerts.guardianProfession
                      ? "focus:outline-primary-strawberryRed"
                      : "focus:outline-primary-marineBlue"
                  } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                  type="text"
                  placeholder="e.g. Doctor"
                />
                <span
                  className={`${
                    alerts.guardianProfession ? "inline" : "hidden"
                  } text-primary-strawberryRed text-sm`}
                >
                  This field is required
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-[20px] sm:pt-[35px]">
            <button
              type="button"
              className="text-neutral-coolGray font-[500] capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
              onClick={() => navigate("/jet/personalinfo")}
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

export default GuardianDetails;
