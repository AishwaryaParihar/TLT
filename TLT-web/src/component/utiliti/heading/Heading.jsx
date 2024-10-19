// Headings.jsx

import React from "react";

const Headings = ({ children, heading, style }) => {
  let HeadingType;
  let className;
  switch (heading) {
    case "h1":
      HeadingType = "h1";
      className = "xl:text-6xl lg:text-6xl text-4xl  font-semibold";
      break;
    case "h2":
      HeadingType = "h2";
      className = "text-4xl lg:text-5xl font-semibold";
      break;
    case "h3":
      HeadingType = "h3";
      className = "text-3xl font-semibold";
      break;
    case "h4":
      HeadingType = "h4";
      className = "text-xl font-semibold";
      break;
    case "h5":
      HeadingType = "h5";
      className = "text-lg font-bold";
      break;
    case "h6":
      HeadingType = "h6";
      className =
        "font-medium text-lg md:text-1xl text-primary-light ";
      break;
    default:
      HeadingType = "h2";
      className = "sm:text-lg font-bold";
  }

  return (
    <HeadingType className={`${style} ${className} font-semibold lg:my-2 my-1`}>
      {children}
    </HeadingType>
  );
};

export default Headings;
