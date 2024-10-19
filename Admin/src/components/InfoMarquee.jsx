import React, { useState } from 'react'
import img from '../assets/product1.jpg'

const InfoMarquee = () => {





  return (
    <div>


      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg" src={img} alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TLT Judicial Academy 2024</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Each student at TLT Judicial Academy receives personalized attention through one-on-one mentoring sessions.</p>
          <a href="#" class="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-600">
           Upload
          
          </a>
        </div>
      </div>

    </div>
  )
}

export default InfoMarquee