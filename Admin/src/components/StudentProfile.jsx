import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SummaryApi from '../Common/SummaryApi';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const StudentProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const result = await axios.get(
          SummaryApi.FastTractFormStudent.url.replace(":id", id)
        );
        setProfileData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (id) {
      getProfileData(id);
    }
  }, [id]);

  if (!profileData) {
    return <p className="text-center text-red-600">Loading...</p>;
  }

  const { fastTrackData } = profileData;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-3xl bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center border-b border-red-500 pb-2">
          Student Profile
        </h1>

        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img
              src={`http://localhost:8080/${fastTrackData.picture}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-red-600 mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-red-600">{fastTrackData.name}</h2>
              <p className="text-gray-600">{fastTrackData.email}</p>
            </div>
          </div>
        </div>

        {/* Data displayed in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p><strong className="text-red-600 ">Student Name:</strong> {fastTrackData.name}</p>
            <p><strong className="text-red-600">Place of Birth:</strong> {fastTrackData.placeOfBirth}</p>
            <p><strong className="text-red-600">Date of Birth:</strong> {new Date(fastTrackData.dateOfBirth).toLocaleDateString()}</p>
            <p><strong className="text-red-600">Father's Name:</strong> {fastTrackData.fatherName}</p>
            <p><strong className="text-red-600">Mother's Name:</strong> {fastTrackData.motherName}</p>
            <p><strong className="text-red-600">Address:</strong> {fastTrackData.fullAddress}</p>
            <p><strong className="text-red-600">State:</strong> {fastTrackData.state}</p>
            <p>
              <strong className="text-red-600">Aadhar Card:</strong> 
              <a 
                href={`${baseUrl}/${fastTrackData.aadharCard}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-red-500"
              >
                View Aadhar Card
              </a>
            </p>
          </div>

          <div className="space-y-4">
            <p><strong className="text-red-600">Email:</strong> {fastTrackData.email}</p>
            <p><strong className="text-red-600">Qualification:</strong> {fastTrackData.qualification}</p>
            <p><strong className="text-red-600">College/University:</strong> {fastTrackData.collegeUniversity}</p>
            <p><strong className="text-red-600">Pursuing LLB:</strong> {fastTrackData.pursuingLLB}</p>
            <p><strong className="text-red-600">Year of passing:</strong> {fastTrackData.yearOfPassing}</p>
            <p><strong className="text-red-600">Old Student Of Shubham Sir:</strong> {fastTrackData.oldStudentOfShubhamSir}</p>
            <p><strong className="text-red-600">Institution:</strong> {fastTrackData.institution}</p>
            <p><strong className="text-red-600">Amout Paid:</strong> {fastTrackData.amountPaid}</p>
            {/* Add more fields as necessary */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
