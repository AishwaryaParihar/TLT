import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../Common/SummaryApi';

const Dashboard = () => {
  const [empowermentCount, setEmpowermentCount] = useState(0);
  const [fastTrackCount, setFastTrackCount] = useState(0);
  const [jetCount, setJetCount] = useState(0);
  const [MPCJCount, setMPCJCount] = useState(0);
  const [pyPapersCount, setPyPapersCount] = useState(0);
  const [tpmCount, setTpmCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchEmpowermentCount = async () => {
    try {
      const response = await axios(
        {
          url:SummaryApi.GetTotalEmpowermentForms.url,
          method:SummaryApi.GetTotalEmpowermentForms.method
        }
      );
      setEmpowermentCount(response.data.totalForms);
    } catch (error) {
      console.error('Error fetching EmpowermentForm count:', error);
    }
  };

  const fetchFastTrackCount = async () => {
    try {
      const response = await axios(
{       url:SummaryApi.GetTotalFastTrackForms.url,
  method:SummaryApi.GetTotalFastTrackForms.method
}
      );
      setFastTrackCount(response.data.totalForms);
    } catch (error) {
      console.error('Error fetching FastTrackForm count:', error);
    }
  };

  const fetchJetCount = async () => {
    try {
      const response = await axios(
   {
    url:SummaryApi.GetTotalJetForms.url,
    method:SummaryApi.GetTotalJetForms.method
   }
      );
      setJetCount(response.data.totalForms);
    } catch (error) {
      console.error('Error fetching JetForm count:', error);
    }
  };

  const fetchMPCJCount = async () => {
    try {
      const response = await axios(
     {
      url:SummaryApi.GetTotalMPCJform.url,
      method:SummaryApi.GetTotalMPCJform.method
     }
      );
      setMPCJCount(response.data.totalForms);
    } catch (error) {
      console.error('Error fetching MPCJForm count:', error);
    }
  };

  const fetchPyPapersCount = async () => {
    try {
      const response = await axios(
{
  url:SummaryApi.GetTotalPyPapersCount.url,
  method:SummaryApi.GetTotalPyPapersCount.method
}
      );
      setPyPapersCount(response.data.totalForms);
    } catch (error) {
      console.error('Error fetching PyPapers count:', error);
    }
  };

  const fetchTpmCount = async () => {
    try {
      const response = await axios(
     {
      url:SummaryApi.GetTotalTpmCount.url,
      method:SummaryApi.GetTotalTpmCount.method
     }
      );
      setTpmCount(response.data.totalForms);
    } catch (error) {
      console.error('Error fetching TPM count:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchEmpowermentCount(),
      fetchFastTrackCount(),
      fetchJetCount(),
      fetchMPCJCount(),
      fetchPyPapersCount(),
      fetchTpmCount(),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const cardsData = [
    {
      title: 'Total Empowerment Forms',
      count: empowermentCount,
      route: '/dashboard/EmpowermentAdmin',
    },
    {
      title: 'Total FastTrack Forms',
      count: fastTrackCount,
      route: '/dashboard/FastTrackForm',
    },
    {
      title: 'Total Jet Forms',
      count: jetCount,
      route: '/dashboard/jetformdetail',
    },
    {
      title: 'Total MPCJ Forms',
      count: MPCJCount,
      route: '/dashboard/mpcj-form',
    },
    {
      title: 'Total Py Papers',
      count: pyPapersCount,
      route: '/dashboard/py-paper',
    },
    { title: 'Total TPM Forms', count: tpmCount, route: '/dashboard/tpm-form' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <p>Loading form data....</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-3xl flex items-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(card.route)} // Navigate on click
            >
              <FaFileAlt className="text-blue-900 text-4xl mr-4" />
              <div>
                <h3 className="text-lg  font-bold">{card.title}</h3>
                <p className="text-4xl font-bold text-red-500">{card.count}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
