import React from 'react';
import cardImage1 from '../../assets/productImage3.jpg';
import cardImage2 from '../../assets/productImage4.jpg';
import { NavLink } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Translation Practice Material MPCJ & CGCJ',
    href: 'MpcjproductCard',
    imageSrc: cardImage1,
    imageAlt: "Front of men's Basic Tee in black.",
    subName: 'Translation Material',
    price: 'Know More',
  },
  {
    id: 2,
    name: 'MPCJ offline mock test series',
    href: 'MockTestCard',
    imageSrc: cardImage2,
    imageAlt: "Front of men's Basic Tee in black.",
    subName: 'Test Material',
    price: 'Know More',
  },
];

const StudyEssentials = () => {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tight text-red-500 text-center mb-6 text-shadow">
        <span className="text-black">Our</span> Products
      </h1>
      <div className="bg-white min-h-auto flex flex-col items-center justify-center mb-16">
        <div className="mx-auto max-w-2xl px-3 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6 sm:gap-x-10 lg:gap-x-12">
            {products.map((product) => (
              <div key={product.id} className="group relative shadow-lg p-3">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-96 lg:w-96">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-black w-[200px]">
                      <NavLink to={`/study-Essentials/${product.href}`}>
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        {product.name}
                      </NavLink>
                    </h3>
                    <p className="mt-1 text-sm text-red-500 font-bold">
                      {product.subName}
                    </p>
                  </div>
                  <p className="text-sm font-medium bg-primary ms-1 px-10 pt-4 mt-3 rounded-lg text-white h-14">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyEssentials;
