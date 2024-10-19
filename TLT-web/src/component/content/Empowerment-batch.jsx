import React, { useState, useEffect } from 'react';
import Registration from './Registration';
import axios from 'axios';
import { State, City } from 'country-state-city';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../Common/SummaryAPI';

const EmpowermentBatch = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [data, setData] = useState({
    name: '',
    placeOfBirth: '',
    dateOfBirth: '',
    fullAddress: '',
    state: '',
    city: '',
    pinCode: '',
    qualification: '',
    collegeUniversity: '',
    pursuingLLB: '',
    yearOfPassing: '',
    Batch: '',
    email: '',
    fatherName: '',
    motherName: '',
    permanentAddress: '',
    permanentState: '',
    permanentCity: '',
    feesPaid: '',
    amountPaid: '',
    oldStudentOfShubhamSir: '',
    institution: '',
  });

  const [files, setFiles] = useState({
    photo: null,
    aadharCard: null,
  });

  useEffect(() => {
    const fetchedStates = State.getStatesOfCountry('IN'); // Fetch states of India
    setStates(fetchedStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchedCities = City.getCitiesOfState('IN', selectedState); // Fetch cities for the selected state
      setCities(fetchedCities);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    console.log(data, files);
    e.preventDefault();
    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });
    try {
      const response = await axios({
        url: SummaryApi.empowermentForm.url,
        method: SummaryApi.empowermentForm.method,
        data: formData,
      });

      console.log(response.data);

      const redirectUrl = response.data.redirectUrl || response.data;
      if (typeof redirectUrl === 'string' && redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl; // Redirect if the response contains a valid URL
      } else {
        toast.error('Redirect URL not found or invalid.');
      }
    } catch (error) {
      toast.error('An error occurred during submission. Please try again.');
    }
  };

  const batches = [
    { id: 1, name: 'Batch 01' },
    { id: 2, name: 'Batch 02' },
    // { id: 3, name: 'Batch 03' },
  ];

  return (
    <div className="">
      <div className="px-5 md:px-10 lg:px-20 py-0">
        <Registration />
      </div>

      <div className="text-justify mx-auto sm:px-10 px-5 md:px-10 lg:px-40 py-0 ">
        <div className="mt-4 ">
          <h2 className="text-white bg-red-500 text-center text-3xl py-3 px-4 sm:px-20">
            EMPOWERMENT BATCH
          </h2>
        </div>
        <br />
        <form className="mt-0" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="sm:flex items-center mb-4">
              <div className="sm:flex sm:w-1/2 pr-2">
                <label className="block text-left font-bold text-lg sm:w-1/3">
                  Choose Picture:
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleFileChange}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div className="sm:flex items-center">
                <label
                  htmlFor="Batch"
                  className="block text-left font-bold text-lg sm:w-1/3"
                >
                  Batch:
                </label>
                <select
                  className="form-control border rounded w-full p-2"
                  name="Batch"
                  id="Batch"
                  onChange={handleInput}
                  value={data.Batch}
                  required
                >
                  <option value="" disabled>
                    Select Batch
                  </option>
                  {batches.map((batch) => (
                    <option key={batch.id} value={batch.name}>
                      {batch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="name"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={data.name}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="placeOfBirth"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Place Of Birth:
              </label>
              <input
                type="text"
                name="placeOfBirth"
                id="placeOfBirth"
                onChange={handleInput}
                value={data.placeOfBirth}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="dateOfBirth"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Date Of Birth:
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                onChange={handleInput}
                value={data.dateOfBirth}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="fullAddress"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Full Address:
              </label>
              <input
                name="fullAddress"
                id="fullAddress"
                onChange={handleInput}
                value={data.fullAddress}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="state"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                State:
              </label>
              <select
                className="form-control border rounded w-full p-2"
                name="state"
                id="state"
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setData((prev) => ({ ...prev, state: e.target.value }));
                }}
                value={data.state}
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="city"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                City:
              </label>
              <select
                className="form-control border rounded w-full p-2"
                name="city"
                id="city"
                onChange={(e) => {
                  setData((prev) => ({ ...prev, city: e.target.value }));
                }}
                value={data.city}
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="pinCode"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Pin Code:
              </label>
              <input
                type="number"
                name="pinCode"
                id="pinCode"
                onChange={handleInput}
                value={data.pinCode}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="qualification"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Qualification:
              </label>
              <input
                type="text"
                name="qualification"
                id="qualification"
                onChange={handleInput}
                value={data.qualification}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="collegeUniversity"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                College/University:
              </label>
              <input
                type="text"
                name="collegeUniversity"
                id="collegeUniversity"
                onChange={handleInput}
                value={data.collegeUniversity}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="pursuingLLB"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Pursuing LLB:
              </label>
              <div className="flex space-x-4 sm:w-3/4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pursuingLLB"
                    id="pursuingLLBYes"
                    value="yes"
                    onChange={handleInput}
                    className="border rounded"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pursuingLLB"
                    id="pursuingLLBNo"
                    value="no"
                    onChange={handleInput}
                    className="border rounded"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="yearOfPassing"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Year Of Passing:
              </label>
              <input
                type="text"
                name="yearOfPassing"
                id="yearOfPassing"
                onChange={handleInput}
                value={data.yearOfPassing}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="email"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInput}
                value={data.email}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <h2 className="text-white bg-red-500 text-center text-3xl py-3 px-4">
              Personal Information
            </h2>
            <div className="sm:flex items-center">
              <label
                htmlFor="fatherName"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Father's Name:
              </label>
              <input
                type="text"
                name="fatherName"
                id="fatherName"
                onChange={handleInput}
                value={data.fatherName}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="motherName"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Mother's Name:
              </label>
              <input
                type="text"
                name="motherName"
                id="motherName"
                onChange={handleInput}
                value={data.motherName}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="permanentAddress"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Permanent Address:
              </label>
              <input
                type="text"
                name="permanentAddress"
                id="permanentAddress"
                onChange={handleInput}
                value={data.permanentAddress}
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="permanent-state"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Permanent State:
              </label>
              <select
                className="form-control border rounded w-full p-2"
                name="permanentState"
                id="permanent-state"
                value={data.permanentState}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    permanentState: e.target.value,
                  }));
                  setSelectedCity(''); // Reset city when state changes
                }}
              >
                <option value="" disabled>
                  Select State
                </option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="permanent-city"
                className="block text-left font-bold text-lg sm:w-1/4 "
              >
                Permanent City:
              </label>
              <select
                className="form-control border rounded w-full p-2"
                name="permanentCity"
                id="permanent-city"
                value={data.permanentCity}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    permanentCity: e.target.value,
                  }))
                }
                disabled={!data.permanentState}
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:flex items-center">
              <label className="block text-left font-bold text-lg sm:w-1/4">
                Upload Aadhar Card:
              </label>
              <input
                type="file"
                name="aadharCard"
                onChange={handleFileChange}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <h2 className="text-white bg-red-500 text-center text-3xl py-3 px-4 sm:px-10">
                Fees Paid (First Installment)
              </h2>
            </div>
            <div className="sm:flex justify-between items-center">
              <label className="flex text-left font-bold text-lg sm:w-1/6">
                Online / UPI:
                <input
                  type="radio"
                  name="feesPaid"
                  value="yes"
                  onChange={handleInput}
                  className="mx-2 mt-1"
                />{' '}
              </label>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="amount-paid"
                className="block text-left font-bold text-lg  sm:w-1/4"
              >
                Amount Paid:
              </label>
              <input
                type="number"
                name="amountPaid"
                id="amount-paid"
                value={data.amountPaid}
                onChange={handleInput}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="sm:flex items-center">
              <label className="block text-left font-bold text-lg  sm:w-1/6">
                Old Student of Shubham Sir:
              </label>
              <div className="flex space-x-4 sm:ml-8">
                <label>
                  <input
                    type="radio"
                    name="oldStudentOfShubhamSir"
                    value="yes"
                    autoComplete="off"
                    onChange={handleInput}
                    className="mr-2"
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="oldStudentOfShubhamSir"
                    value="no"
                    autoComplete="off"
                    onChange={handleInput}
                    className="mr-2"
                  />{' '}
                  No
                </label>
              </div>
            </div>

            <div className="sm:flex items-center">
              <label
                htmlFor="institution"
                className="block text-left font-bold text-lg sm:w-1/4"
              >
                Institution:
              </label>
              <input
                type="text"
                name="institution"
                id="institution"
                onChange={handleInput}
                value={data.institution}
                className="border rounded w-full p-2"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-red-500 border text-white font-bold py-2 px-4 rounded mb-10"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmpowermentBatch;
