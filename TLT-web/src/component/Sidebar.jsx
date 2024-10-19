import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { data } from './data/data';

const Sidebar = () => {
  return (
    <aside className="absolute top-20 sm:top-5 left-10 right-[100%]  bg-primary sm:relative bg-mobile h-[100px] sm:bg-cover bg-no-repeat w-[80%] sm:h-[90%] pt-8 sm:pl-8 sm:basis-[30%] sm:rounded-lg flex items-start justify-center sm:flex-col sm:justify-start sm:bg-primary">
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center space-x-4 leading-4 sm:mb-10 bg-primary justify-center mb-16 px-1 py-1 "
          >
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? '#000' : 'hsl(229, 24%, 87%)',
                background: isActive ? 'white' : 'transparent',
                border: isActive ? 'none' : '2px solid hsl(229, 24%, 87%)',
                fontWeight: '500',
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              })}
              to={item.linkTo}
            >
              {item.id}
            </NavLink>
            <div>
              <p className="hidden sm:block uppercase text-white text-[14px]">
                {item.step}
              </p>
              <p className="hidden sm:block uppercase text-white font-[500] tracking-wider">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
