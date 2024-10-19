// Button.jsx
import React from "react";

const Button = ({ children, onClick, color }) => {
  // Determine the button color based on the provided prop
  let bgColorClass = "";
  switch (color) {
    case "blue":
      bgColorClass = "bg-blue-500 hover:bg-blue-700";
      break;
    case "white":
      bgColorClass = "bg-white text-red-500 uppercase border-red-500 border";
      break;
    case "red":
      bgColorClass = "bg-primary hover:bg-red-700 uppercase text-white";
      break;
    default:
      bgColorClass = "bg-gray-500 hover:bg-gray-700";
  }

  return (
    <button
      className={`px-4 py-2  font-semibold rounded ${bgColorClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
