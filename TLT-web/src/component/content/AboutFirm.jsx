import React from "react";
import Headings from "../utiliti/heading/Heading";
import { data } from "../data/aboutFirm";
const AboutFirm = () => {
  return (
    <section className="mx-5 md:mx-10 mb-20">
      <div className="flex flex-wrap justify-evenly gap-10 items-center relative ">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex flex-wrap flex-col md:gap-3 gap-3 md:mt-12 mt-[110px]">
            <div className="lg:w-[250px] lg:h-[200px] md:w-[350px] md:h-[300px] sm:w-[160px] sm:h-[150px] w-[150px] h-[140px]">
              <img
                src={data.image1}
                alt="pen image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-[250px] lg:h-[250px] md:w-[350px] md:h-[300px] sm:w-[160px] sm:h-[150px] w-[150px] h-[140px]">
              <img
                src={data.image2}
                alt="hammer image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-16 md:mt-0">
            <img
              src={data.image3}
              alt="justice image"
              className="lg:w-[300px] lg:h-[465px] md:w-[350px] md:h-[610px] sm:w-[170px] sm:h-[315px] w-[150px] h-[300px] object-cover mt-10 md:mt-12"
            />
          </div>
        </div>

        <div className="w-full md:w-[700px] lg:w-[500px] partial-border mt-10 md:mt-12">
          <Headings heading={"h1"}>
            About <span className="text-primary">TLT</span>
          </Headings>
          <div className="md:mt-10 mt-5 text-justify">{data.desc}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutFirm;
