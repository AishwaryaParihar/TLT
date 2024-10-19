import React from "react";
import Headings from "../heading/Heading";

const Breadcrumbs = ({ children, heading, bannerImage }) => {
  // Function to capitalize the first letter of the heading
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <div
        className="h-[40vh] lg:h-[65vh] w-full flex items-center justify-center m-0 relative"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex text-center justify-center items-center w-full h-full px-5 md:px-20">
          <div className="flex flex-col gap-2 text-center justify-center items-center">
            <Headings heading={"h2"}>
              {heading ? capitalizeFirstLetter(heading) : "About"}
            </Headings>
            <button className="text-primary text-lg font-medium rounded-full px-6 py-1 mt-2 border border-red-500">
              {heading
                ? `Home / ${capitalizeFirstLetter(heading)}`
                : "Home / About"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full">{children}</div>
    </>
  );
};

export default Breadcrumbs;
