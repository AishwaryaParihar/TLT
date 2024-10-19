import React from "react";
import { useNavigate } from "react-router-dom";

const PersonalInfo = ({ formData, handleChange }) => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = React.useState({
    name: false,
    email: false,
    number: false,
    category: false,
    address: false,
    dob: false,
    state: false,
    city: false,
    gender: false,
  });


    const handleNext = (event) => {
    event.preventDefault();
    console.log("handleNext called");
    console.log("Current Form Data:", formData);
    navigate("/jet/guardiandetails");
    // Validate fields and set alerts
    const newAlerts = {};
    for (const key in formData) {
      newAlerts[key] = formData[key] === "";
    }

    setAlerts(newAlerts);

    // Check for validation errors
    if (Object.values(newAlerts).some((alert) => alert)) {
      return; // If there are errors, don't proceed
    }
  
   
  };

  return (
    <div className="flex row w-full h-full sm:pl-[120px] mt-24 mb-10">
      <div className="w-full sm:w-[60%] p-4 pl-[0px]">
        <h1 className="text-3xl font-bold mb-2 text-primary-marineBlue">
          Personal Details
        </h1>
        <div className="flex flex-col">
          <div className="form-wrapper flex flex-wrap flex-col relative">
            <div className="flex flex-wrap sm:flex-nowrap">
              <div className="flex flex-wrap sm:flex-nowrap w-[100%] sm:w-[50%] flex-col">
                <label className="flex text-primary-marineBlue font-[500] mb-2">
                  Name
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className={`jinput ${
                    alerts.name
                      ? "focus:outline-primary-strawberryRed"
                      : "focus:outline-primary-marineBlue"
                  } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                  type="text"
                  placeholder="e.g.Stephen King"
                />
                <span
                  className={`${
                    alerts.name ? "inline" : "hidden"
                  } text-primary-strawberryRed font-[500] text-sm`}
                >
                  This field is required
                </span>
              </div>
              <div className="flex w-[50%] mt-5">
                <label className="flex justify-center items-center text-primary-marineBlue font-[500] mb-2">
                  Male
                  <input
                    name="gender"
                    onChange={handleChange}
                    checked={formData.gender === "male"}
                    value="male"
                    className={`mx-2 jinput ${
                      alerts.gender
                        ? "focus:outline-primary-strawberryRed"
                        : "focus:outline-primary-marineBlue"
                    }`}
                    type="radio"
                  />
                </label>
                <span
                  className={`${
                    alerts.gender ? "inline" : "hidden"
                  } text-primary-strawberryRed font-[500] text-sm`}
                >
                  This field is required
                </span>
                <label className="flex justify-center items-center text-primary-marineBlue font-[500] mb-2">
                  Female
                  <input
                    name="gender"
                    onChange={handleChange}
                    checked={formData.gender === "female"}
                    value="female"
                    className={`mx-2 jinput ${
                      alerts.gender
                        ? "focus:outline-primary-strawberryRed"
                        : "focus:outline-primary-marineBlue"
                    }`}
                    type="radio"
                  />
                </label>
                <span
                  className={`${
                    alerts.gender ? "inline" : "hidden"
                  } text-primary-strawberryRed font-[500] text-sm`}
                >
                  This field is required
                </span>
                <label className="flex justify-center items-center text-primary-marineBlue font-[500] mb-2">
                  Other
                  <input
                    name="gender"
                    onChange={handleChange}
                    checked={formData.gender === "other"}
                    value="other"
                    className={`jinput mx-2 ${
                      alerts.gender
                        ? "focus:outline-primary-strawberryRed"
                        : "focus:outline-primary-marineBlue"
                    }`}
                    type="radio"
                  />
                </label>
                <span
                  className={`${
                    alerts.gender ? "inline" : "hidden"
                  } text-primary-strawberryRed font-[500] text-sm`}
                >
                  This field is required
                </span>
              </div>
            </div>
            <div className="flex flex-wrap mt-1">
              <div className="flex flex-col w-[100%] sm:w-[50%]">
                <label className="text-primary-marineBlue font-[500] mb-0 sm:mb-2">
                  Category
                </label>
                <input
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  className={`jinput ${
                    alerts.category
                      ? "focus:outline-primary-strawberryRed"
                      : "focus:outline-primary-marineBlue"
                  } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                  type="text"
                  placeholder="e.g.General"
                />
                <span
                  className={`${
                    alerts.category ? "inline" : "hidden"
                  } text-primary-strawberryRed text-sm`}
                >
                  This field is required
                </span>
              </div>
              <div className="flex flex-col w-[100%] sm:w-[50%]">
                <label className="text-primary-marineBlue font-[500] mb-0 sm:mb-2">
                  DOB
                </label>
                <input
                  name="dob"
                  onChange={handleChange}
                  value={formData.dob}
                  className={`jinput ${
                    alerts.dob
                      ? "focus:outline-primary-strawberryRed"
                      : "focus:outline-primary-marineBlue"
                  } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                  type="date"
                  placeholder="e.g.Stephen King"
                />
                <span
                  className={`${
                    alerts.dob ? "inline" : "hidden"
                  } text-primary-strawberryRed text-sm`}
                >
                  This field is required
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-2">
            <div className="flex flex-col w-[100%] sm:w-[50%]">
              <label className="text-primary-marineBlue font-[500] mb-2">
                Email Address
              </label>
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                className={`jinput ${
                  alerts.email
                    ? "focus:outline-primary-strawberryRed"
                    : "focus:outline-primary-marineBlue"
                } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                type="email"
                placeholder="e.g.stephenking@lorem.com"
              />
              <span
                className={`${
                  alerts.email ? "inline" : "hidden"
                } text-primary-strawberryRed text-sm`}
              >
                This field is required
              </span>
            </div>
            <div className="flex flex-col w-[100%] sm:w-[50%]">
              <label className="text-primary-marineBlue font-[500] mb-2">
                Phone Number
              </label>
              <input
                name="number"
                onChange={handleChange}
                value={formData.number}
                className={`jinput ${
                  alerts.number
                    ? "focus:outline-primary-strawberryRed"
                    : "focus:outline-primary-marineBlue"
                } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                type="text"
                placeholder="e.g. +1 234 567 890"
              />
              <span
                className={`${
                  alerts.number ? "inline" : "hidden"
                } text-primary-strawberryRed text-sm`}
              >
                This field is required
              </span>
            </div>
          </div>
          <div className="flex flex-wrap mt-1">
            <div className="flex flex-col w-[100%] sm:w-[50%]">
              <label className="text-primary-marineBlue font-[500] mb-2">
                State
              </label>
              <input
                name="state"
                onChange={handleChange}
                value={formData.state}
                className={`jinput ${
                  alerts.state
                    ? "focus:outline-primary-strawberryRed"
                    : "focus:outline-primary-marineBlue"
                } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                type="text"
                placeholder="e.g.New York"
              />
              <span
                className={`${
                  alerts.state ? "inline" : "hidden"
                } text-primary-strawberryRed text-sm`}
              >
                This field is required
              </span>
            </div>
            <div className="flex flex-col w-[100%] sm:w-[50%]">
              <label className="text-primary-marineBlue font-[500] mb-2">
                City
              </label>
              <input
                name="city"
                onChange={handleChange}
                value={formData.city}
                className={`jinput ${
                  alerts.city
                    ? "focus:outline-primary-strawberryRed"
                    : "focus:outline-primary-marineBlue"
                } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
                type="text"
                placeholder="e.g.New York City"
              />
              <span
                className={`${
                  alerts.city ? "inline" : "hidden"
                } text-primary-strawberryRed text-sm`}
              >
                This field is required
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <label className="text-primary-marineBlue font-[500] mb-2">
              Address
            </label>
            <input
              name="address"
              onChange={handleChange}
              value={formData.address}
              className={`jinput ${
                alerts.address
                  ? "focus:outline-primary-strawberryRed"
                  : "focus:outline-primary-marineBlue"
              } outline outline-1 outline-neutral-lightGray rounded-[4px] p-3`}
              type="text"
              placeholder="e.g.123 Main Street"
            />
            <span
              className={`${
                alerts.address ? "inline" : "hidden"
              } text-primary-strawberryRed text-sm`}
            >
              This field is required
            </span>
          </div>
          <div className="lex justify-between items-center pt-[20px] sm:pt-[35px]">
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

export default PersonalInfo;
