import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PersonalInfo from "../component/content/PersonalInfo";
import GuardianDetails from "../component/content/Guardiandetails";
import Documents from "../component/content/Documents";
import Educational from "../component/content/Educational";
import Consent from "../component/content/Consent";
import Sidebar from "../component/Sidebar";
import ThankYou from "../component/content/ThankYou";


const MultiStepForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    category: "",
    address: "",
    dob: "",
    state: "",
    city: "",
    gender: "",
    guardianName: "",
  guardianProfession: "",
    degree: "",
    college: "",
    graduationYear: "",
    masterGraduationYear: "",
    masterUniversityAndDegree: "",
    annualIncome: "",
    accomodationRequirement: "",
  });

  const [files, setFiles] = useState({
    photo: null,
    adhaarPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0] || null,
    }));
  };
  
  


  return (
    <div className="bg-white w-[100%] sm:h-[40rem] h-[50%] mt-[0px] sm:mt-[0px] rounded-xl shadow-xl p-4 flex flex-col sm:flex sm:flex-row items-center">
      <Sidebar />
      <div className="w-full">
        <Routes>
          <Route path="/personalinfo" element={<PersonalInfo formData={formData} handleChange={handleChange} />} />
          <Route path="/guardiandetails" element={<GuardianDetails formData={formData} handleChange={handleChange} />} />
          <Route path="/documents" element={<Documents files={files} handleFileChange={handleFileChange} />} />
          <Route path="/educational" element={<Educational formData={formData}  files={files} handleChange={handleChange} />} />
          <Route path="/consent" element={<Consent formData={formData}  files={files} handleChange={handleChange} />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </div>
    </div>
  );
};

export default MultiStepForm;
