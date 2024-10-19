import React from "react";
import "./Whatshap.css";
import Whatsapp from "../../assets/whatshap.png";

function Whatshap() {
  return (
   <div>
      {" "}
      <a target="_blank" href="https://wa.me/+919238176156">
        <img src={Whatsapp} className="whatsapp-img" alt="" />{" "}
      </a>
    </div>
  );
}

export default Whatshap;
