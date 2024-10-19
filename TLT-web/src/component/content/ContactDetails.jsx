import React from "react";
import Headings from "../utiliti/heading/Heading";
import contactDetails from "../data/contactDetails";

const ContactDetails = () => {
  return (
    <section>
      <div className="bg-primary flex flex-wrap justify-center items-center mt-10">
        <div className="flex flex-wrap p-5">
          {contactDetails.map((detail, index) => (
            <div
              key={index}
              className={`w-full md:w-[400px] text-white p-5 ${
                index === 1 ? "border-l-2 border-r-2 border-white" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <span>
                  <a href={detail.link} target="_blank" rel="noopener noreferrer">
                    <img src={detail.icon} alt="" className="w-10 h-10 mr-2" />
                  </a>
                </span>
                <Headings style={"h4"}>{detail.heading}</Headings>
                <p className="text-white text-justify">
                  {detail.link.startsWith("tel:") ? (
                    <a href={detail.link} className="text-white">
                      {detail.info}
                    </a>
                  ) : (
                    detail.info
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
