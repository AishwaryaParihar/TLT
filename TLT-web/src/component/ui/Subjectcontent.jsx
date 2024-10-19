import React from "react";
import Headings from "../utiliti/heading/Heading";
import { testcarddata } from "../data/Testcarddata";

const Subjectcontent = () => {
  return (
    <div>
      {testcarddata.map((items, index) => (
        <div key={index}>
          <Headings style="text-primary font-bolder " heading={"h4"}>
            {items.heading}
          </Headings>
          <ul>
            <li className="pb-4 text-justify">{items.testitems}</li>
            <li className="pb-4 text-justify">{items.testitems2}</li>
            <li className="pb-4 text-justify">{items.testitems3}</li>
            <li className="pb-4 text-justify">{items.testitems4}</li>
            <li className="pb-4 text-justify">{items.testitems5}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Subjectcontent;
