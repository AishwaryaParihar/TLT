import React, { useState } from 'react';
import * as xlsx from 'xlsx';
import axios from 'axios';
import { FaMedal, FaClipboardList, FaComment } from 'react-icons/fa';
import SummaryApi from '../Common/SummaryApi';

const LeaderboardUpload = () => {
  const [excelData, setExcelData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedBatchSection, setSelectedBatchSection] = useState('');

  const readExcel = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const excelFile = xlsx.read(data);
    const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const excelJson = xlsx.utils.sheet_to_json(excelSheet);

    const updatedData = excelJson.map((student) => ({
      ...student,
      batch: selectedBatch,
      batchSection: selectedBatchSection,
    }));
    setExcelData(updatedData);
    storeData(updatedData);
  };

  const storeData = async (data) => {
    try {
      await axios({
        url: SummaryApi.postleaderBoard.url,
        method: SummaryApi.postleaderBoard.method,
        data: data,
      });
      // Optionally reset the excel data after successful upload
      setExcelData([]);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Gold':
        return <FaMedal className="text-yellow-400" />;
      case 'Silver':
        return <FaClipboardList className="text-gray-300" />;
      case 'Bronze':
        return <FaComment className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-start flex-row">
        <div className="flex items-start flex-col me-2">
          <label className="font-bold text-2xl mb-5">Upload Excel Here</label>
          <input
            type="file"
            className="bg-green-500 text-white font-bold p-2 w-56 rounded-md"
            onChange={readExcel}
          />
        </div>
        <select
          className="bg-red-500 text-white p-1 mb-2 rounded-md w-32"
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="" disabled>
            Select Batch
          </option>
          <option value="Empowerment Batch">Empowerment Batch</option>
          <option value="Fast Track Batch">Fast Track Batch</option>
        </select>

        <select
          className="bg-red-500 text-white p-1 mb-2 rounded-md w-32 ms-2"
          onChange={(e) => setSelectedBatchSection(e.target.value)}
        >
          <option value="" disabled>
            Select Batch Section
          </option>
          <option value="Batch 01">Batch 01</option>
          <option value="Batch 02">Batch 02</option>
          <option value="Batch 03">Batch 03</option>
        </select>
      </div>

      <div className="leaderboard-container max-w-5xl mx-auto mt-8 bg-gray-50 rounded-lg shadow-lg border border-red-500">
        <h2 className="text-3xl font-bold p-4 text-center text-white bg-red-700 rounded-t-lg shadow-md">
          Leaderboard
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-red-500 text-white transition-all hover:shadow-md">
              <th className="py-4 px-4 border-b border-red-300">Name</th>
              <th className="py-4 px-4 border-b border-red-300">Badge</th>
              <th className="py-4 px-4 border-b border-red-300">
                Saturday Mains Test
              </th>
              <th className="py-4 px-4 border-b border-red-300">MCQ</th>
              <th className="py-4 px-4 border-b border-red-300">
                Group Discussion
              </th>
              <th className="py-4 px-4 border-b border-red-300">
                Judgment Writing
              </th>
              <th className="py-4 px-4 border-b border-red-300">Translation</th>
              <th className="py-4 px-4 border-b border-red-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map((student, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                } hover:bg-red-200 transition-colors`}
              >
                <td className="py-4 px-4 text-navy-900 font-semibold">
                  {student.Name}
                  {/* Change this to the appropriate field for student name */}
                </td>
                <td className="py-4 px-4 text-navy-900 flex items-center">
                  {getBadgeIcon(student.badge)}
                  <span className="ml-2 font-semibold">{student.badge}</span>
                </td>
                <td className="py-4 px-4 text-navy-800">
                  {student.saturdayMainsTest}
                </td>
                <td className="py-4 px-4 text-navy-800">{student.mcq}</td>
                <td className="py-4 px-4 text-navy-800">
                  {student.groupDiscussion}
                </td>
                <td className="py-4 px-4 text-navy-800">
                  {student.judgmentWriting}
                </td>
                <td className="py-4 px-4 text-navy-800">
                  {student.translation}
                </td>
                <td className="py-4 px-4 font-bold text-navy-900">
                  {student.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderboardUpload;
