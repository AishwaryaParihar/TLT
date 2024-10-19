import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { State, City } from 'country-state-city';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../Common/SummaryAPI';

const RegistrationForm = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [data, setData] = useState({
    name: '',
    batch:'',
    placeOfBirth: '',
    dateOfBirth: '',
    fullAddress: '',
    state: '',
    pinCode: '',
    qualification: '',
    collegeUniversity: '',
    pursuingLLB: '',
    yearOfPassing: '',
    email: '',
    fatherName: '',
    motherName: '',
    permanentAddress: '',
    permanentState: '',
    permanentCity: '',
    feesPaid: '',
    amountPaid: '',
    prelims: '',
    mains: '',
    targetedstate: '',
    score: '',
    year: '',
    oldStudentO7fShubhamSir: '',
    institution: '',
  });

  const [files, setFiles] = useState({
    picture: null,
    aadharCard: null,
  });

  useEffect(() => {
    // Fetch states when component mounts
    const fetchedStates = State.getStatesOfCountry('IN'); // 'IN' is for India, change if needed
    setStates(fetchedStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      const fetchedCities = City.getCitiesOfState('IN', selectedState);
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
        url: SummaryApi.fastTrackForm.url,
        method: SummaryApi.fastTrackForm.method,
        data: formData,
      });

      console.log(response.data);

      // Check if the response data is a URL
      const redirectUrl = response.data.redirectUrl || response.data;
      if (typeof redirectUrl === 'string' && redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl; // Redirect to the URL
      } else {
        console.error('Redirect URL not found or not valid:', redirectUrl);
        toast.error('Redirect URL not found or invalid.'); // Inform the user
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('An error occurred during submission. Please try again.'); // Display error to the user
    }
  };

  return (
    <div className="text-justify mx-auto sm:px-10 px-5 md:px-10 lg:px-40 py-0 ">
      <div className="mt-4">
        <h2 className="text-white bg-red-500 text-center text-3xl py-3 px-4 sm:px-10">
          SUPER 30 FAST TRACK BATCH
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 ">
        <div className="space-y-6 sm:px-10 md:px-2 ">
        <div className="sm:flex items-center mb-4">
        <div className="sm:flex sm:w-1/2 pr-2">
         
            <label
              htmlFor="picture"
              className="block text-left font-bold text-lg  sm:w-1/4 md:w-1/4"
            >
              Choose Picture:
            </label>
            <input
              type="file"
              name="picture"
              id="picture"
              autoComplete="off"
              onChange={handleFileChange}
              className="border rounded w-full me-5 p-2"
            />
          </div>
          <div className="sm:flex sm:w-1/2 pl-2">
                <label
                  htmlFor="Batch"
                  className="block text-left font-bold text-lg sm:w-1/3"
                >
                  Batch:
                </label>
                <select
                  className="form-control border rounded w-full p-2"
                  name="batch"
                  id="batch"
                  onChange={handleInput}
                  value={data.batch}
                  required
                >
                  <option value="" disabled>
                    Select Batch
                  </option>
                  <option value="Batch 1">Batch 1</option>
                  <option value="Batch 2">Batch 2</option>
                  <option value="Batch 3">DLP Fast Track Batch</option>
                </select>
              </div>
              </div>
          <div className="sm:flex items-center">
            <label
              htmlFor="name"
              className="block text-left font-bold text-lg  sm:w-1/4"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={data.name}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="place-of-birth"
              className="block text-left font-bold text-lg  sm:w-1/4"
            >
              Place Of Birth:
            </label>
            <input
              type="text"
              name="placeOfBirth"
              id="place-of-birth"
              autoComplete="off"
              value={data.placeOfBirth}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="date-of-birth"
              className="block text-left font-bold text-lg  sm:w-1/4 "
            >
              Date Of Birth:
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="date-of-birth"
              autoComplete="off"
              value={data.dateOfBirth}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="sm:flex items-center">
            <label
              htmlFor="full-address"
              className="block text-left font-bold text-lg  sm:w-1/4 "
            >
              Full Address:
            </label>
            <textarea
              name="fullAddress"
              id="full-address"
              autoComplete="off"
              value={data.fullAddress}
              onChange={handleInput}
              className="border rounded w-full p-2"
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
              value={data.state}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setData((prev) => ({
                  ...prev,
                  state: e.target.value,
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

          {/* <div className="sm:flex items-center">
            <label
              htmlFor="city"
              className="block text-left font-bold text-lg sm:w-1/4 ">
              City:
            </label>
            <select
              className="form-control border rounded w-full p-2"
              name="city"
              id="city"
              value={data.city}
              onChange={(e) => setData(prev => ({
                ...prev,
                city: e.target.value,
              }))}
              disabled={!selectedState}>
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="sm:flex items-center">
            <label
              htmlFor="pincode"
              className="block text-left font-bold text-lg sm:w-1/4 "
            >
              Pin Code:
            </label>
            <input
              type="number"
              name="pinCode"
              id="pinCode"
              autoComplete="off"
              value={data.pinCode}
              onChange={handleInput}
              className="border rounded w-full p-2"
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
              autoComplete="off"
              value={data.qualification}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="college-university"
              className="block text-left font-bold text-lg  sm:w-1/4"
            >
              College/University:
            </label>
            <input
              type="text"
              name="collegeUniversity"
              id="college-university"
              autoComplete="off"
              value={data.collegeUniversity}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label className="block text-left font-bold text-lg  sm:w-1/5">
              Pursuing LL.B:
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="pursuingLLB"
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
                  name="pursuingLLB"
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
              htmlFor="year-of-passing"
              className="block text-left font-bold text-lg  sm:w-1/4"
            >
              Year Of Passing:
            </label>
            <input
              type="number"
              name="yearOfPassing"
              id="year-of-passing"
              autoComplete="off"
              value={data.yearOfPassing}
              onChange={handleInput}
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
              autoComplete="off"
              value={data.email}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Personal details */}
          <div>
            <h2 className="text-white bg-red-500 text-center text-3xl py-3 px-4">
              Personal Information
            </h2>
          </div>
          <div className="sm:flex items-center">
            <label
              htmlFor="father-name"
              className="block text-left font-bold text-lg  sm:w-1/4 "
            >
              Father's Name:
            </label>
            <input
              type="text"
              name="fatherName"
              id="father-name"
              autoComplete="off"
              value={data.fatherName}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="mother-name"
              className="block text-left font-bold text-lg sm:w-1/4"
            >
              Mother's Name:
            </label>
            <input
              type="text"
              name="motherName"
              id="mother-name"
              autoComplete="off"
              value={data.motherName}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="permanent-address"
              className="block text-left font-bold text-lg sm:w-1/4"
            >
              Permanent Address:
            </label>
            <textarea
              name="permanentAddress"
              id="permanent-address"
              autoComplete="off"
              value={data.permanentAddress}
              onChange={handleInput}
              className="border rounded w-full p-2"
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
            <label
              htmlFor="aadhar-card"
              className="block text-left font-bold text-lg  sm:w-1/4 "
            >
              Upload Aadhar (Front and Back):
            </label>
            <input
              type="file"
              name="aadharCard"
              id="aadhar-card"
              autoComplete="off"
              onChange={handleFileChange}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Last Exam */}
          <div>
            <h2 className="text-white bg-red-500 text-center text-3xl py-3 px-4 sm:px-10">
              Details Of Last Qualified Exam
            </h2>
          </div>
          <div className="flex justify-around items-center space-x-4">
            <div className="flex justify-between items-center">
              <label className="flex text-left font-bold text-lg px-5">
                Prelims:
                <input
                  type="radio"
                  name="prelims"
                  value="yes"
                  onChange={handleInput}
                  className="mx-2 mt-1"
                />
              </label>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex text-left font-bold text-lg ">
                Mains:
                <input
                  type="radio"
                  name="mains"
                  value="yes"
                  onChange={handleInput}
                  className="mx-2 mt-1"
                />{' '}
              </label>
            </div>
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="last-exam-state"
              className="block text-left font-bold text-lg  sm:w-1/4 "
            >
              State:
            </label>
            <input
              type="text"
              name="targetedstate"
              id="last-exam-state"
              value={data.targetedstate}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="score"
              className="block text-left font-bold text-lg  sm:w-1/4 "
            >
              Score:
            </label>
            <input
              type="number"
              name="score"
              id="score"
              value={data.score}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="sm:flex items-center">
            <label
              htmlFor="year"
              className="block text-left font-bold text-lg  sm:w-1/4"
            >
              Year:
            </label>
            <input
              type="number"
              name="year"
              id="year"
              value={data.year}
              onChange={handleInput}
              className="border rounded w-full p-2"
            />
          </div>

          {/* Fees Paid */}
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

          {/* Submit Button */}
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

      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
