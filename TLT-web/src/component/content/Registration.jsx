import React from 'react';
import styles from './registration.module.css';

const Registration = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className='flex flex-col justify-center items-center text-center mt-10'>
        <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl'>
          TLT <span className='text-primary'>JUDICIAL</span> ACADEMY
        </h1>
        <h3 className='text-black text-sm sm:text-lg lg:text-xl font-bold sm:font-semibold mt-3'>
          2ND FLOOR, JYOTI CINEPLEX, MP NAGAR
        </h3>
        <h3 className='text-black text-sm sm:text-lg lg:text-xl font-bold sm:font-semibold mt-3'>
          ZONE 1, BHOPAL, MOB: 9238176156
        </h3>
        <h1 className={`${styles.formBorder} text-2xl sm:text-3xl lg:text-4xl mt-4`}>
          REGISTRATION FORM
        </h1>
        <h3 className='text-black text-sm sm:text-lg lg:text-xl font-bold sm:font-semibold mt-3'>
          2024-2025 Session
        </h3>
      </div>
    </div>
  );
}

export default Registration;
