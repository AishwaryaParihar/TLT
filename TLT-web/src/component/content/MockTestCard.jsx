import React, { useState } from "react";
import Headings from "../utiliti/heading/Heading";
import writtenImg from "../../assets/written.jpg";
import MpcjContactForm from "../../component/content/MpcjContactForm";

const MockTestCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const arrowSpan = (
    <span className="text-red-500 text-xs">
      <i className="fa-solid fa-arrow-right-long"></i>
    </span>
  );

  return (
    <>
      <section className="mx-3 md:mx-20 my-20">
        <Headings heading={"h2"} style={"text-shadow"}>
          <span className="text-primary">MPCJ</span> Mains Offline{" "}
          <span className="text-primary">Test Series</span>
        </Headings>
        <div className="flex flex-col md:flex-row mt-5 md:mt-14">
          <div className="md:w-1/2 space-y-4 mt-5">
            <Headings heading={"h5"}>
              {arrowSpan} Total 14 Offline Mock (3Hrs Each)
            </Headings>
            <ul className="list-disc list-inside ml-5">
              <li>6 Sectional Mocks</li>
              <li>4 Fully Syllabus Mocks</li>
              <li>1 Replica Mock of MPCJ Mains (including all the 4 papers)</li>
            </ul>
            <Headings heading={"h5"}>
              {arrowSpan} Personalised Audio Reviews on Mail by Shubham Sir
            </Headings>
            <Headings heading={"h5"}>
              {arrowSpan} Instant Paper Evaluation within 3 days
            </Headings>
            <Headings heading={"h5"}>
              {arrowSpan} Leaderboard Projection after every week
            </Headings>
            <Headings heading={"h5"}>
              {arrowSpan} In Both Languages Hindi + English
            </Headings>
            <button
              className=" w-52 bg-red-500 text-center text-white p-2 rounded"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center mt-5 md:mt-0 relative">
            <img src={writtenImg} alt="Written Test" className="object-cover" />
            <div className="absolute bottom-2 right-2 bg-red-500 text-white font-bold py-3 px-5 rounded">
              ₹ 4999 only
            </div>
            <div className="absolute top-2 left-2 bg-red-500 text-white p-4 rounded flex flex-col justify-center items-center">
              <span className="font-bold">Starting Date</span>{" "}
              <span className="font-bold">15th March</span>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-3 rounded-lg max-w-full w-full bg-opacity-75">
            <button
              className="absolute text-3xl  font-bold z-50 m-7 sm:right-16 sm:top-8 right-4 top-3  text-black"
              onClick={handleCloseModal}
            >
              X
            </button>
            <MpcjContactForm />
          </div>
        </div>
      )}
    </>
  );
};

export default MockTestCard;
