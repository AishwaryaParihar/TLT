import React from 'react';
import Testimony from './content/Testimony';
import Facility from './content/Facility';
import Fee from './content/Fee';
import Bestfeaturs from './content/Bestfeaturs';
import YoutubeGallery from './content/YoutubeGallery';
import Feature from './content/Feature';
import AboutUs from './content/Aboutus';

export const Home = () => {
  return (
    <>
      <Bestfeaturs />
      <Feature />
      <AboutUs />
      <Fee />
      <YoutubeGallery />
      <Facility />
      <Testimony />
    </>
  );
};
