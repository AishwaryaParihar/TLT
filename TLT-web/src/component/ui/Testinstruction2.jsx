import React from "react";
import { instructiondata2 } from "../data/testinstruction";
import { NavLink } from "react-router-dom";

const Testinstruction2 = () => {
  return (
    <>
      <div className="flex flex-col px-5 sm:px-16 flex-wrap">
        {instructiondata2.map((items, index) => (
          <div key={index}>
            <h2 className="text-primary font-bold text-2xl my-3">
              {items.heading1}
            </h2>
            <ul>
              <li className="mb-2">{items.li1}</li>
              <li className="mb-2">{items.li2}</li>
              <li className="mb-2">{items.li3}</li>
              <li className="mb-2">{items.li4}</li>
            </ul>

            <h2 className="text-primary font-bold text-2xl my-3">
              {items.heading2}
            </h2>
            <ul>
              <li className="mb-2">{items.lii1}</li>
              <li className="mb-2">{items.lii2}</li>
              <li className="mb-5">{items.lii3}</li>
            </ul>
          </div>
        ))}
        <div className="pb-10">
          <p className="mb-6">
            Choose your default Language
            <label
              htmlFor="lang"
              className="border border-1 bg-primary py-1 text-white font-bold ps-2 rounded-md"
            >
              Select Language
              <select
                id="lang"
                className="bg-primary text-white font-bold rounded-md"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </label>
            Please note that all questions will appear in your default language.
            This language can't be changed afterwards.
          </p>
          <p className="mb-8">
            <input type="checkbox" /> I have read and understood all the
            instructions. I understand that using unfair means of any sort for
            any advantage will lead to immediate disqualification. The decision
            of ixambee.com will be final in these matters.
          </p>

          <NavLink className="bg-primary rounded-lg py-2 px-6 text-white font-bold hover:shadow-md hover:shadow-black">
            Start Mock
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Testinstruction2;
