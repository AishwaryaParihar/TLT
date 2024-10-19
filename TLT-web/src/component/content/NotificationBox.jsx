import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SummaryApi from '../../Common/SummaryAPI';

const NotificationBox = () => {
  const marqueeRef = useRef(null);
  const [notifay, setNotifay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios({
        url:SummaryApi.Notification.url,
        method:SummaryApi.Notification.method
      });
      setNotifay(result.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const handleMouseOver = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop();
    }
  };

  const handleMouseOut = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start();
    }
  };

  return (
    <div className=" text-black p-4 h-[40vh] lg:h-[90vh] overflow-hidden text-center">
      <h2 className="text-3xl font-bold my-5 text-center">
        Latest <span className="text-primary">Notifications</span>
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <marquee
          ref={marqueeRef}
          height="100%"
          behavior="scroll"
          direction="up"
          scrollamount="3"
          loop="true"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <ul>
            {notifay.length === 0 ? (
              <li className="text-center">No notifications available.</li>
            ) : (
              notifay.map((notification, index) => (
                <li key={index} className="mb-6 text-primary font-bold text-center">
                  <span>
                    {notification.notificationText}
                    <a
                      href={notification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => console.log(notification.url)}
                    >
                      <span className="latest text-black"> Click Here!</span>
                    </a>
                  </span>
                </li>
              ))
            )}
          </ul>
        </marquee>
      )}
    </div>
  );
};

export default NotificationBox;
