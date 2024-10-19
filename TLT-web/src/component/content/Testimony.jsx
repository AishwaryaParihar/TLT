import React, { useState } from "react";
import Slider from "react-slick";
import { data } from "../data/testimony";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Headings from "../utiliti/heading/Heading";
import "./Testimony.css"; 
import quoteImg from "../../assets/gif/quotation-mark.png";
import quoteImgRed from "../../assets/gif/quotation-mark-red.png"; 

const Testimony = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesToShow = 3;

  const settings = { 
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease",
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: (dots) => (
      <div style={{ padding: "10px", bottom: "-25px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const isMiddleSlide = (index) => {
    const middleSlideIndex = (activeSlide + Math.floor(slidesToShow / 2)) % data.length;
    const adjustedIndex = (index + data.length) % data.length;
    return adjustedIndex === middleSlideIndex;
  };


  return (
    <div className="m-5 md:m-20">
      <Headings heading={"h6"} style={"text-shadow"}>
        Testimonials
      </Headings>
      <Headings heading={"h2"} style={"text-shadow"}>
        What <span className="text-primary">They</span> Say
      </Headings>
      <Slider {...settings} className="testimony-slider">
        {data.map((item, index) => (
          <div
            className={`px-3 md:px-4 mb-10 ${
              isMiddleSlide(index) ? "scale-105" : "scale-100"
            } transition-transform duration-300`}
            key={index}
          >
           <div
              className={`h-[325px] mt-10 md:mt-20 ${
                isMiddleSlide(index) ? "bg-primary text-white" : "bg-gray-100"
              } p-5 md:p-7 gap-5 lg:gap-10 mt-10 transition-all duration-300 relative`}
            >
              <div className="flex flex-col items-center  text-justify">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-cover mb-2"
                />
                <div className="font-bold text-xl md:text-lg lg:text-xl mb-1">
                  {item.name}
                </div>
                <div className="mb-4 text-sm md:text-xs lg:text-sm">
                  {item.rank}
                </div>
                {/* <img
                    src={isMiddleSlide(index) ? quoteImg : quoteImgRed}
                    alt="Quotation Mark"
                    className="w-8 h-8 mb-2"
                  /> */}
                <div className="mt-1 text-base md:text-sm lg:text-base truncated-text">
                  {item.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimony;
