import React from 'react';
import StudyCards from './content/StudyCards';

const StudyEssentials = () => {
  return (
    <>
      <div className="my-5">
        <div className="flex flex-row w-full banner3  h-full bg-cover">
          <div className="w-full h-full flex lg:mb-0 banner3 bg-contain backdrop-blur-sm bg-bottom"></div>
        </div>
      </div>
      <StudyCards />
    </>
  );
};

export default StudyEssentials;
