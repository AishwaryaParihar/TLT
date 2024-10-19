import React from "react";
import ListItemHoverEffect from "./ListItemHoverEffect";
import FacilityImage from "./FacilityImage";
import Headings from "../utiliti/heading/Heading";

const Listsection = () => {
  return (
    <div className="mx-5 md:mx-20">
      <div className="flex flex-wrap lg:gap-20 gap-10 lg:flex-nowrap mt-5">
        <div className="">
          <FacilityImage />
        </div>
        <div className="mt-5">
          <Headings heading={"h2"}>Amenities</Headings>
          <div className="mt-5 lg:mt-8">
            <ListItemHoverEffect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listsection;
