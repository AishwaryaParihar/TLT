import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummaryApi from '../Common/SummaryApi'; // Import the API routes

const UpdateMarquee = () => {
  const [marquees, setMarquees] = useState([]);
  const [newMarqueeText, setNewMarqueeText] = useState('');
  const [editMarqueeId, setEditMarqueeId] = useState(null);
  const [editMarqueeText, setEditMarqueeText] = useState('');

  // Fetch all marquees from the backend
  const fetchMarquees = async () => {
    try {
      const response = await axios({
        url: SummaryApi.Getmarquee.url,
        method: SummaryApi.Getmarquee.method,
      });
      if (response.status === 200) {
        setMarquees(response.data);
      } else {
        toast.error('Failed to fetch marquees');
      }
    } catch (error) {
      toast.error('Error fetching marquees');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarquees(); // Fetch marquees when the component mounts
  }, []);

  // Create a new marquee
  const handleCreateMarquee = async (e) => {
    e.preventDefault();
    if (!newMarqueeText.trim()) {
      toast.error('Marquee text cannot be empty');
      return;
    }
    try {
      const response = await axios({
        url: SummaryApi.Allmarquee.url,
        method: SummaryApi.Allmarquee.method,
        data: { text: newMarqueeText },
      });
      if (response.status === 201) {
        toast.success('Marquee created successfully!');
        setNewMarqueeText(''); // Reset input field
        fetchMarquees(); // Refresh marquee list
      } else {
        toast.error('Failed to create marquee');
      }
    } catch (error) {
      toast.error('Error creating marquee');
      console.error(error);
    }
  };

  // Edit an existing marquee
  const handleEditClick = (marquee) => {
    setEditMarqueeId(marquee._id);
    setEditMarqueeText(marquee.text);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditMarqueeId(null);
    setEditMarqueeText('');
  };

  // Update an existing marquee
  const handleUpdateMarquee = async (id) => {
    if (!editMarqueeText.trim()) {
      toast.error('Marquee text cannot be empty');
      return;
    }
    try {
      const response = await axios({
        url: `${SummaryApi.updateMarquee.url.replace(':id', id)}`,
        method: SummaryApi.updateMarquee.method,
        data: { text: editMarqueeText },
      });
      if (response.status === 200) {
        toast.success('Marquee updated successfully!');
        setEditMarqueeId(null);
        setEditMarqueeText('');
        fetchMarquees(); // Refresh marquee list
      } else {
        toast.error('Failed to update marquee');
      }
    } catch (error) {
      toast.error('Error updating marquee');
      console.error(error);
    }
  };

  // Delete a marquee
  const handleDeleteMarquee = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this marquee?');
    if (!confirmDelete) return;

    try {
      const response = await axios({
        url: `${SummaryApi.DeleteMarquee.url.replace(':id', id)}`,
        method: SummaryApi.DeleteMarquee.method,
      });
      if (response.status === 200) {
        toast.success('Marquee deleted successfully!');
        fetchMarquees(); // Refresh marquee list
      } else {
        toast.error('Failed to delete marquee');
      }
    } catch (error) {
      toast.error('Error deleting marquee');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel - Manage Marquees</h2>

      <form onSubmit={handleCreateMarquee} className="mb-8">
        <div className="flex items-center">
          <input
            type="text"
            value={newMarqueeText}
            onChange={(e) => setNewMarqueeText(e.target.value)}
            placeholder="Enter marquee text"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-2">S.No</th>
            <th className="border border-gray-300 p-2">Marquee Text</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {marquees.length > 0 ? (
            marquees.map((marquee, index) => (
              <tr key={marquee._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  {editMarqueeId === marquee._id ? (
                    <input
                      type="text"
                      value={editMarqueeText}
                      onChange={(e) => setEditMarqueeText(e.target.value)}
                      className="p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    marquee.text
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editMarqueeId === marquee._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateMarquee(marquee._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(marquee)}
                        className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMarquee(marquee._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border border-gray-300 p-4 text-center">
                No marquees available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateMarquee;
