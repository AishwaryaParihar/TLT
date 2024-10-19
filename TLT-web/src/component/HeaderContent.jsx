import React from 'react';
import Headings from './utiliti/heading/Heading';
import Button from './utiliti/buttons/Button';
import { Link } from 'react-router-dom';
import NotificationBox from './content/NotificationBox';

export const HeaderContent = ({ isHome }) => {
  return (
    <div>
      {isHome ? (
        <div className="my-5">
          <div style={{ backgroundColor: '#B6C2BC' }}>
            <div className="flex flex-col lg:flex-row md:justify-between">
              <div className="w-full lg:w-3/4 mb-6 lg:mb-0 banner1">
                {/* <div className="uppercase font-semibold text-xs inline-block tracking-wider ">
                  <Headings heading={'h6'} style={'text-shadow'}>
                    WELCOME TO TLT JUDICIAL ACADEMY
                  </Headings>
                </div>
                <Headings heading={'h1'} style={'tracking-wider text-shadow'}>
                  Best <br /> <span className="text-primary">Education</span> Expertise
                </Headings>
                <p className="tracking-wider py-3">
                  Far far away, behind the word mountains, far from the countries Vokalia <br /> and Consonantia, there live the blind texts.
                </p> */}
              </div>

              <div className="w-full lg:w-1/4 grid grid-flow-row justify-center">
                <NotificationBox />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
