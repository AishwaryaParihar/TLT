import React from 'react';
import court from '../../assets/court.jpg';
import fc from '../../assets/fc-img.webp';
import facility from '../../assets/facility.png';

const FacilityImage = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-2 relative">
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:mt-10">
        <div className="flex flex-col px- gap-3 md:gap-2 mt-[50px] md:mt-0 lg:mt-[0px]">
          <div className="w-[150px] h-[120px] sm:w-[160px] sm:h-[120px] md:w-[350px] md:h-[250px] lg:w-[250px] lg:h-[250px]">
            <img
              src={facility}
              alt="pen image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[150px] h-[120px] sm:w-[160px] sm:h-[120px] md:w-[350px] md:h-[240px] lg:w-[250px] lg:h-[250px]">
            <img
              src={fc}
              alt="hammer image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 px-0 my-0 md:mt-0 lg:mt-0">
          <img
            src={court}
            alt="justice image"
            className="w-[150px] h-[255px] sm:w-[160px] sm:h-[255px] md:w-[350px] md:h-[500px] lg:w-[250px] lg:h-[500px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityImage;
