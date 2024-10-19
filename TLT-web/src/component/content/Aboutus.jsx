import React, { useState } from 'react';
import Headings from '../utiliti/heading/Heading';
import QuizApp from '../QuizApp';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(2); // Set initial active tab (0: Foundation, 1: Fast-Track, 2: Crash Course)

  const tabContent = [
    {
      title: 'Foundation Batch',
      content: (
        <div className="leading-loose space-y-2">
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Comprehensive Batch Covering foundation subjects for all state
            judicial services examination
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Especially designed to build a concrete conceptual clarity
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Exhaustive dictation and note making
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Aid in semester exam preparation
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Validity: 12+3 Months
          </div>
        </div>
      ),
    },
    {
      title: 'Fast-Track Batch',
      content: (
        <div className="leading-loose space-y-2">
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Especially curated for short and rapid preparation
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Subject coverage through rigorous practice and regular tests
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Target-based revision
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Validity: 6 Months
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Validity: 3 Months (From the date of notification)
          </div>
        </div>
      ),
    },
    {
      title: 'Crash Course Batch',
      content: (
        <div className="leading-loose space-y-2">
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Rapid revision batches targeting prelims exams
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Tips and tricks to master a variety of MCQs
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Skeleton notes for last-minute revision
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Rigorous MCQ practice
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-arrow-right-long mr-2 text-red-500 text-xs"></i>
            Validity: 3 Months (From the date of notification)
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="md:pb-14 my-5" id="about">
      <div className="container mx-auto px-5 md:px-20 mb-10 md:mb-20">
        <div className="md:mb-16 mb-7">
          <Headings heading={'h5'} style={'text-shadow'}>
            About Us
          </Headings>
          <Headings heading={'h2'}>
            Know Us <span className="text-shadow text-primary">Better</span>{' '}
          </Headings>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <div className="">
              <div className="flex flex-wrap justify-center lg:justify-start mb-6">
                <div className="menu flex flex-wrap gap-6 md:gap-6">
                  {tabContent.map((tab, index) => (
                    <div
                      key={index}
                      className={`shadow-md cursor-pointer py-3 px-5 rounded font-bold ${
                        activeTab === index ? 'bg-primary text-white ' : ''
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      <span>{tab.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                {tabContent.map((tab, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full p-6 bg-white rounded transition-all duration-300 ease-in-out transform ${
                      activeTab === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-10'
                    }`}
                  >
                    {tab.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="text-center pt-72 md:pt-56 lg:pt-5">
              <Headings heading={'h3'} style={'font-bold'}>
                Quiz of the day
              </Headings>

              <QuizApp />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
