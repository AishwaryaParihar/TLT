import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../Common/SummaryAPI';

const MarqueeUI = () => {
  const [marqueeData, setMarqueeData] = useState('');

  const fetchAllData = async () => {
    try {
      const response = await fetch(SummaryApi.Marquee.url, {
        method: SummaryApi.Marquee.method,
        credentials: 'include',
      });

      const dataResponse = await response.json();
      
      if (response.ok) {
        if (dataResponse.length > 0) {
          const latestMarquee = dataResponse[dataResponse.length - 1]; // Get latest marquee
          setMarqueeData(latestMarquee.text);
        } else {
          setMarqueeData("No Marquee Data Available");
        }
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('An error occurred while fetching the data.');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <marquee 
      width="100%" 
      behavior="scroll" 
      className="bg-red-600 fixed bottom-0 z-20 font-bold py-1 text-white"
    >
      {marqueeData || "No Marquee Data Available"}
    </marquee>
  );
};

export default MarqueeUI;
