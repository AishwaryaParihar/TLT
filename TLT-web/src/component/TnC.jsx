import React from "react";
import courseDetails from "./data/tnc";
import Headings from "./utiliti/heading/Heading";

const TnC = () => {
  return (
    <div className="px-5 md:px-20 py-8">
      <Headings heading={"h2"} style="pb-10 text-center">
        <span className="text-primary">Terms and Conditions</span> for Admission
        to <br />
        <span className="text-primary"> TLT</span> Judicial Academy:
      </Headings>
      {courseDetails.map((section, index) => (
        <div key={index} className="section">
          <Headings heading={"h4"} className="text-2xl font-semibold mb-2">
            {section.section}
          </Headings>
          <ul className="mb-8">
            {section.details.map((detail, detailIndex) => (
              <li key={detailIndex} className="mb-2 flex items-start">
                <i className="fas fa-arrow-right text-primary mr-2 mt-2"></i>
                <div>{detail.content}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TnC;
