import React from "react";
import "tailwindcss/tailwind.css";
import "./ContactUs.css";
import ContactDetails from "./ContactDetails";
import Map from "./Map";
const ContactUs = () => {
  const statename = [
    { id: 1, name: "Andaman and Nicobar Islands" },
    { id: 2, name: "Andhra Pradesh" },
    { id: 3, name: "Arunachal Pradesh" },
    { id: 4, name: "Assam" },
    { id: 5, name: "Bihar" },
    { id: 6, name: "Chandigarh" },
    { id: 7, name: "Chhattisgarh" },
    { id: 8, name: "Dadra and Nagar Haveli" },
    { id: 9, name: "Daman and Diu" },
    { id: 10, name: "Delhi" },
    { id: 11, name: "Goa" },
    { id: 12, name: "Gujarat" },
    { id: 13, name: "Haryana" },
    { id: 14, name: "Himachal Pradesh" },
    { id: 15, name: "Jammu and Kashmir" },
    { id: 16, name: "Jharkhand" },
    { id: 17, name: "Karnataka" },
    { id: 18, name: "Kenmore" },
    { id: 19, name: "Kerala" },
    { id: 20, name: "Lakshadweep" },
    { id: 21, name: "Madhya Pradesh" },
    { id: 22, name: "Maharashtra" },
    { id: 23, name: "Manipur" },
    { id: 24, name: "Meghalaya" },
    { id: 25, name: "Mizoram" },
    { id: 26, name: "Nagaland" },
    { id: 27, name: "Odisha" },
    { id: 28, name: "Paschim Medinipur " },
    { id: 29, name: "Pondicherry" },
    { id: 30, name: "Punjab" },
    { id: 31, name: "Rajasthan" },
    { id: 32, name: "Sikkim" },
    { id: 33, name: "Tamil Nadu" },
    { id: 34, name: "Telangana" },
    { id: 35, name: "Tripura" },
    { id: 36, name: "Uttar Pradesh" },
    { id: 37, name: "Uttarakhand" },
    { id: 38, name: "Vaisali" },
    { id: 39, name: "West Bengal" },
  ];

  return (
    <section>
      <div className="form-container ">
        <div className="form-box flex justify-center items-center min-h-screen">
          <div className="container-main shadow p-6 rounded-lg max-w-lg mx-auto">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text text-shadow text-primary text-center mb-6">
              Get In Touch
            </h2>
            <form action="#">
              <div className="form-row flex space-x-4 mb-6">
                <div className="input-data w-full relative">
                  <input
                    type="text"
                    className="block w-full focus:border-red-500 outline-none"
                    required
                  />
                  <label className="absolute left-0 bottom-1 text-gray-500 transition-all font-medium">
                    Your Name
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="input-data w-full relative">
                  <input
                    type="tel"
                    className="block w-full focus:border-red-500 outline-none"
                    required
                  />
                  <label className="absolute left-0 bottom-1 text-gray-500 transition-all font-medium">
                    Contact No.
                  </label>
                  <div className="underline"></div>
                </div>
              </div>
              <div className="form-row flex space-x-4 mb-6">
                <div className="input-data w-full relative">
                  <input
                    type="email"
                    className="block w-full focus:border-red-500 outline-none"
                    required
                  />
                  <label className="absolute left-0 bottom-1 text-gray-500 transition-all font-medium">
                    Email
                  </label>
                  <div className="underline"></div>
                </div>
                {/* --------------------- state field ------------------- */}

                <div className="input-data w-full relative">
                  <label
                    className="absolute left-0 bottom-1 text-gray-500 transition-all ps-2 font-medium"
                    for="state"
                  ></label>
                  <select
                    id="state"
                    class="bg-gray-50 border  font-medium border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 border-t-0 border-x-0   dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  >
                    <option value="" className="font-medium">
                      State
                    </option>
                    {statename.map((item, index) => (
                      <option
                        key={index}
                        value={`${item.name}`}
                        className="text-white"
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ------------------ what do you do ----------------------- */}
              <div className="form-row flex space-x-4 mb-6">
                <div className="input-data w-full relative">
                  <label
                    for="countries"
                    class="block text-sm font-medium text-gray-500 dark:text-white pl-2 me-2"
                  ></label>
                  <select
                    name="What Do You Do"
                    id="countries"
                    class="bg-gray-50 border  font-medium border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 border-t-0 border-x-0   dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  >
                    <option value="What do you do">What do you do</option>
                    <option value={"Pursuing LLB"}>Pursuing LLB</option>
                    <option>Pursuing LLM</option>
                    <option>Non working</option>
                    <option>Working- Govt Job</option>
                    <option>Working - Pvt. Job</option>
                  </select>
                  <div className="underline"></div>
                </div>
                <div className="input-data w-full relative">
                  <label
                    for="countries"
                    class="block text-sm font-medium text-gray-500 dark:text-white pl-4 "
                  ></label>
                  <select
                    id="countries"
                    class="bg-gray-50 border font-medium border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 border-t-0 border-x-0   dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  >
                    <option value=""> What is your Query about?</option>
                    <option>Admission Process</option>
                    <option>Courses Offered</option>
                    <option>Financial Assistance</option>
                    <option>Accommodation</option>
                    <option>Other</option>
                  </select>
                  {/* <input
                  type="tel"
                  className="block w-full focus:border-red-500 outline-none"
                  required
                />
                <label className="absolute left-0 bottom-1 text-gray-500 transition-all">Contact No.</label> */}
                  <div className="underline"></div>
                </div>
              </div>
              {/* ----------------- Targeted States---------------------- */}
              <div className="form-row flex space-x-4 mb-6">
                <div className="input-data w-full relative">
                  <input
                    type="text"
                    className="block w-full focus:border-red-500 outline-none"
                    required
                  />
                  <label className="absolute left-0 bottom-1 text-gray-500 transition-all font-medium">
                    Targeted State
                  </label>
                  <div className="underline"></div>
                </div>
              </div>
              {/* ------------------------ Subject ---------------------------- */}
              <div className="form-row flex space-x-4 mb-6">
                <div className="input-data w-full relative">
                  <input
                    type="text"
                    className="block w-full focus:border-red-500 outline-none"
                    required
                  />
                  <label className="absolute left-0 bottom-1 text-gray-500 transition-all font-medium">
                    Subject
                  </label>
                  <div className="underline"></div>
                </div>
              </div>
              <div className="input-data w-full relative">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-500 dark:text-white pl-4 "
                >
                  What are you looking for
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border  font-medium border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 border-t-0 border-x-0   dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                >
                  <option></option>
                  <option>
                    Full Lenght Foundation Batch (Empowerment Batch)
                  </option>
                  <option>Fast Track Batch</option>
                  <option>Translation Practice Material</option>
                  <option>Language Practice Material</option>
                  <option>Judgement Writing practice Material </option>
                </select>
                <div className="underline"></div>
              </div>
              <div className="form-row submit-btn flex justify-center">
                <button
                  type="submit"
                  className="relative inline-block text-white bg-gradient-to-r p-4 px-14 from-red-700 to-red-400 hover:from-red-400 hover:to-red-700 font-semibold py-2 px-4 rounded-full transition-ease-out "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ContactDetails />
      <Map />
    </section>
  );
};

export default ContactUs;
