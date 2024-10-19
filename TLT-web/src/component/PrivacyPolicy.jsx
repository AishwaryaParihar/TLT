import React from "react";
import { privacyPolicyData } from "./data/privacyPolicy";
import Headings from "./utiliti/heading/Heading";

const PrivacyPolicy = () => {
  return (
    <div className="px-5 md:px-20 py-8">
      <Headings heading={"h2"} style="pb-10 text-center">
        <span className="text-primary">Privacy Policy</span> for TLT Judicial{" "}
        <span className="text-primary">Academy</span>
      </Headings>
      {privacyPolicyData.map((section, index) => (
        <section key={index}>
          <Headings heading={"h4"} className="mb-2">{section.title}</Headings>
          {section.details && (
            <ul className="mb-8">
              {section.details.map((detail, idx) => (
                <li key={idx} className="mb-2 flex items-start">
                  <i className="fas fa-arrow-right text-primary mr-2"></i>
                  {detail}
                </li>
              ))}
            </ul>
          )}
          {section.items &&
            section.items.map((item, idx) => (
              <div key={idx} className="mb-4">
                {item.subtitle && (
                  <h3 className="text-lg font-medium mb-2">{item.subtitle}</h3>
                )}
                {item.details && (
                  <ul className="pl-6">
                    {item.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="mb-2 flex items-start">
                        <i className="fas fa-arrow-right text-primary mr-2 mt-2"></i>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </section>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
