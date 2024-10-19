import React from "react";
import { FaGlobe } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { FaSortNumericUp } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { subjectdata } from "../data/subjecttextdata";
import { NavLink } from "react-router-dom";
import Subjectcontent from "./Subjectcontent";
const SubjectTestCard = () => {
  return (
    <div className="px-5 md:px-20 py-8 flex flex-wrap">
      {subjectdata.map((items, index) => (
        <div
          key={index}
          className="border bottom-1 shadow-md px-10 py-2 flex justify-center flex-col h-[280px]"
        >
          <div className="flex flex-wrap text-justify w-[200px]">
            <img src={items.mock_icon} className="w-[50px] me-2" />
            <div className="pt-3 ps-1">{items.mock_name}</div>
          </div>
          <ul className="mb-8 ps-2">
            <li className="flex">
              <FaGlobe className="mt-2 mr-5" />
              {items.language}
            </li>
            <li className="flex">
              <IoStar className="mt-2 mr-5" />
              {items.rating}
            </li>
            <li className="flex">
              <FaSortNumericUp className="mt-2 mr-5" />
              {items.Total_mock}
            </li>
            <li className="flex">
              <GoClockFill className="mt-2 mr-5" />
              {items.Duration}
            </li>
            <li className="flex">
              <FaEdit className="mt-2 mr-5" />
              {items.start}
            </li>
          </ul>
          <NavLink
            className="bg-primary rounded-lg text-center py-2 px-6 text-white font-bold"
            to="/Testinstruction"
          >
            {items.btn_content}
          </NavLink>
        </div>
      ))}
      <div className="md:w-[75%] px-8 w-[100%]">
        <Subjectcontent></Subjectcontent>
      </div>
    </div>
  );
};

export default SubjectTestCard;
