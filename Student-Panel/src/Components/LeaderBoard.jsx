import React, { useState, useEffect } from 'react';
import { FaMedal, FaClipboardList, FaComment } from 'react-icons/fa';
import SummaryApi from '../Common/Summary';
import axios from 'axios';

const LeaderBoard = ({ course, batch }) => {
  // Accept course and batch as props
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [course, batch]); // Fetch data whenever course or batch changes

  const fetchLeaderboard = async () => {
    try {
      const result = await axios({
        url: SummaryApi.GetleaderBoard.url,
        method: SummaryApi.GetleaderBoard.method,
        params: {
          course: course, // Pass course from props
          batch: batch, // Pass batch from props
        },
      });
      console.log(result);

      if (Array.isArray(result.data.data)) {
        const sorted = result.data.data.sort((a, b) => b.score - a.score); // Sort by score descending
        setSortedData(sorted);
      } else {
        console.error('Unexpected data format:', result.data.data);
        setSortedData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSortedData([]);
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
    <div className="leaderboard-container max-w-5xl mx-auto mt-8 bg-gray-50 rounded-lg shadow-lg border border-red-500">
      <h2 className="text-3xl font-bold p-4 text-center text-white bg-red-700 rounded-t-lg shadow-md">
        Leaderboard for {course} - {batch}
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
          {sortedData.map((student, index) => (
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
              <td className="py-4 px-4 text-navy-800">{student.translation}</td>
              <td className="py-4 px-4 font-bold text-navy-900">
                {student.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
