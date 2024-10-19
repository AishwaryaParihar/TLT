import React from "react";
import logoTLT from "../assets/TLTlogo.png";
import SocialMedia from "./utiliti/SocialMedia/SocialMedia";
import Headings from "./utiliti/heading/Heading";
import { NavLink } from "react-router-dom";

const navlogo = () => {
  return (
    <>
      <div className=" mx-5 md:mx-20 ">

        <div className="flex justify-between">

          <div className="flex flex-row items-center gap-1">
            <img src={logoTLT} className="w-11" alt="" />
            <Headings heading={"h6"} style={"font-semibold"}> <span className="text-red-500 ">TLT </span> Judicial  Academy</Headings>
          </div>


          <div className="flex gap-11 items-center ">
            <div className=" items-center gap-2 hidden lg:flex">
               <div className=""><i className="fa-regular fa-clock fa-xl text-3xl text-red-500"></i></div>
               <div className="font-semibold text-sm ">Monday - Saturday <br /> 8:00AM-8:00PM</div>
            </div>
            <NavLink to="/contact-support">
            <div className=" items-center gap-2 hidden md:flex">
               <div className=""><i className="fa-solid fa-phone fa-xl text-3xl text-red-500"></i></div>
               <div className="font-semibold text-sm"> Contact Us<br />9238176156 </div>
            </div>
            </NavLink>
            
            <div className="gap-2 hidden sm:flex">
              <a href="https://maps.app.goo.gl/fAcQ4mFsxkzvXXe28" target="_blank">
            <div className=""><i className="fa-solid fa-location-dot fa-xl text-3xl text-red-500"></i></div></a>
            <div className="font-semibold text-sm"> Location <br />Jyoti Cineplex,Bhopal </div>
              {/* <SocialMedia /> */}
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default navlogo;
