import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryApi from '../Common/SummaryApi';

const Notification = () => {
  const [notificationText, setNotificationText] = useState('');
  const [url, setUrl] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [editId, setEditId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [updatedUrl, setUpdatedUrl] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios({
        url: SummaryApi.Getnotifiess.url,
        method: SummaryApi.Getnotifiess.method,
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const SubmitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('notificationText', notificationText);
    formData.append('url', url);

    try {
      const result = await axios({
        url: SummaryApi.notifies.url,
        method: SummaryApi.notifies.method,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (result.data.status === 'ok') {
        alert('Uploaded Successfully !!!');
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error uploading notification:', error);
    }
  };

  const handleEdit = (notification) => {
    setEditId(notification._id);
    setUpdatedText(notification.notificationText);
    setUpdatedUrl(notification.url);
  };

  const updateNotification = async (id) => {
    const updatedNotification = {
      notificationText: updatedText,
      url: updatedUrl,
    };

    try {
      const apiUrl = SummaryApi.notifiesUpdate.url.replace(':id', id);
      await axios({
        url: apiUrl,
        method: SummaryApi.notifiesUpdate.method,
        data: updatedNotification,
      });
      alert('Updated Successfully !!!');
      fetchNotifications();
      resetEdit();
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const deleteNotifydata = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this notification?'
    );
    if (confirmDelete) {
      try {
        const apiUrl = SummaryApi.notifiesDelete.url.replace(':id', id);
        const result = await axios({
          url: apiUrl,
          method: SummaryApi.notifiesDelete.method,
        });

        if (result.status === 200) {
          alert('Notification deleted successfully!');
          fetchNotifications();
        } else {
          console.error('Error deleting notification');
        }
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  };

  const resetEdit = () => {
    setEditId(null);
    setUpdatedText('');
    setUpdatedUrl('');
  };

  // Calculate the current notifications to display
  const indexOfLastNotification = currentPage * itemsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total pages calculation
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  return (
    <>
      <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add Notification
        </h2>
        <form onSubmit={SubmitImage}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Notification Title:
            </label>
            <input
              name="notificationText"
              placeholder="Write your notification"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setNotificationText(e.target.value)}
              value={notificationText}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">URL:</label>
            <input
              type="text"
              name="url"
              placeholder="Enter the URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300 ease-in-out"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Notifications List
        </h2>
        <table className="w-full table-auto border-collapse border border-gray-800 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-800 p-2">S.No</th>
              <th className="border border-gray-800 p-2">Notification Title</th>
              <th className="border border-gray-800 p-2">URL</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentNotifications.length > 0 ? (
              currentNotifications.map((notification, index) => (
                <tr
                  key={notification._id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="border border-gray-800 p-2">
                    {indexOfFirstNotification + index + 1}
                  </td>
                  <td className="border border-gray-800 p-2">
                    {editId === notification._id ? (
                      <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    ) : (
                      notification.notificationText
                    )}
                  </td>
                  <td className="border border-gray-800 p-2">
                    {editId === notification._id ? (
                      <input
                        type="text"
                        value={updatedUrl}
                        onChange={(e) => setUpdatedUrl(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                    ) : (
                      notification.url
                    )}
                  </td>
                  <td className="border border-gray-800 p-2">
                    {editId === notification._id ? (
                      <button
                        onClick={() => updateNotification(notification._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(notification)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-700"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotifydata(notification._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-800 p-2 text-center"
                >
                  No notifications available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 border rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
