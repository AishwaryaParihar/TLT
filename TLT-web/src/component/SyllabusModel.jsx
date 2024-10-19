import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

import SummaryApi from '../Common/SummaryAPI';
import axios from 'axios';

const SyllabusModel = ({ onFormSubmit }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    number: '',
  });
  const [nameAlert, setNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [numAlert, setNumAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Field validation
    if (data.name === '') {
      setNameAlert(true);
      valid = false;
    } else {
      setNameAlert(false);
    }
    if (data.email === '') {
      setEmailAlert(true);
      valid = false;
    } else {
      setEmailAlert(false);
    }
    if (data.number === '') {
      setNumAlert(true);
      valid = false;
    } else {
      setNumAlert(false);
    }

    if (valid) {
      try {
        const response = await axios({
          url: SummaryApi.createSyllabusModel.url,
          method: SummaryApi.createSyllabusModel.method,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to submit the form');
        }
        const result = await response.json();
        console.log('Form submitted successfully: ', result);

        // Trigger the download after successful submission
        onFormSubmit(); // Call the passed function
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    onFormSubmit();
  };
  return (
    <>
      {' '}
      <div className="flex justify-center flex-wrap gap-12 my-8">
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Form fields... */}

          <div className="flex flex-col justify-center">
            {' '}
            <div className="flex flex-wrap sm:flex-nowrap w-full flex-col mb-6">
              <label className="flex text-primary-marineBlue font-medium mb-2">
                {' '}
                Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className={`jinput ${
                  nameAlert
                    ? 'focus:outline-primary-strawberryRed'
                    : 'focus:outline-primary-marineBlue'
                } outline outline-1 outline-neutral-lightGray rounded p-3`}
                placeholder="e.g. Stephen King"
                required
              />
              {nameAlert && (
                <span className="text-primary-strawberryRed font-medium text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-wrap sm:flex-nowrap w-full flex-col mb-6">
              <label className="flex text-primary-marineBlue font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className={`jinput ${
                  emailAlert
                    ? 'focus:outline-primary-strawberryRed'
                    : 'focus:outline-primary-marineBlue'
                } outline outline-1 outline-neutral-lightGray rounded p-3`}
                placeholder="e.g. stephenking@lorem.com"
                required
              />
              {emailAlert && (
                <span className="text-primary-strawberryRed font-medium text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-wrap sm:flex-nowrap w-full flex-col mb-6">
              <label className="flex text-primary-marineBlue font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                value={data.number}
                onChange={handleChange}
                className={`jinput ${
                  numAlert
                    ? 'focus:outline-primary-strawberryRed'
                    : 'focus:outline-primary-marineBlue'
                } outline outline-1 outline-neutral-lightGray rounded p-3`}
                placeholder="e.g. 123-456-7890"
                required
              />
              {numAlert && (
                <span className="text-primary-strawberryRed font-medium text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="text-sm font-bold text-white bg-primary px-1 w-48 py-1 mt-2 rounded-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SyllabusModel;
