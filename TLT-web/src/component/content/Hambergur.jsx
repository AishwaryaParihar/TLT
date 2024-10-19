import React, { useState, useEffect, useRef } from 'react';
import { navItems } from '../data/navItem';
import { Link } from 'react-router-dom';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Track the hovered item for sub-menus
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 4) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsOpen(false); // Close menu when scrolled back to top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredItem(null); // Reset hovered item when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div>
      <div className="fixed top-1/2 right-0 transform translate-y-[-50%] z-50 md:hidden">
        <div className="transform rotate-[-90deg]">
          <div
            className="bg-primary py-2 px-4 text-white border border-primary text-lg rounded-t-lg cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="text-white">
              <i className="fas fa-bars"></i>
            </span>
          </div>
        </div>
      </div>

      {isScrolled && (
        <div className="fixed top-1/2 right-0 transform translate-y-[-50%] z-50 hidden md:block">
          <div className="transform rotate-[-90deg]">
            <div
              className="bg-primary py-2 px-4 text-white border border-primary text-lg rounded-t-lg cursor-pointer"
              onClick={toggleMenu}
            >
              <span className="text-white">
                <i className="fas fa-bars"></i>
              </span>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div ref={menuRef} className="fixed top-1/2 right-12 transform translate-y-[-50%] bg-white border border-gray-200 rounded shadow-lg z-40">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li 
                  key={item.name} 
                  className="relative mb-2"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    to={item.href} 
                    className="text-gray-700 hover:bg-red-500 hover:text-white block px-4 py-2 rounded"
                  >
                    {item.name}
                  </Link>

                  {/* Show sub-items if they exist and the item is hovered */}
                  {item.subItems && hoveredItem === item && (
                    <ul className="absolute top-0 right-full w-full bg-white border border-gray-200 shadow-lg">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name} className="mb-2">
                          <Link 
                            to={subItem.href} 
                            className="text-gray-700 hover:bg-red-500 hover:text-white block px-4 py-2 rounded"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
