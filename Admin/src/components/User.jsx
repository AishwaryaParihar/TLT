import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import SummaryApi from '../Common/SummaryApi';

const User = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: ""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.AllUser.url, {
      method: SummaryApi.AllUser.method,
      credentials: 'include'
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUpdate = (user) => {
    setUpdateUserDetails(user);
    setOpenUpdateRole(true);
    // Additional logic for updating user role
  };

  const handleDelete = (userId) => {
    // Logic for deleting user
    console.log('Delete user with ID:', userId);
  };

  return (
    <div className='bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>User Management</h1>
      <div className='bg-white shadow-md rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gray-800 text-white'>
              <th className='p-4 text-left'>Sr.</th>
              <th className='p-4 text-left'>Name</th>
              <th className='p-4 text-left'>Email</th>
              <th className='p-4 text-left'>Created Date</th>
              <th className='p-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={index} className='border-b hover:bg-gray-100'>
                <td className='p-4'>{index + 1}</td>
                <td className='p-4'>{el?.name}</td>
                <td className='p-4'>{el?.email}</td>
                <td className='p-4'>{moment(el?.createdAt).format('LL')}</td>
                <td className='p-4 flex space-x-4'>
                  <button 
                    onClick={() => handleUpdate(el)} 
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300'>
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(el._id)} 
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
