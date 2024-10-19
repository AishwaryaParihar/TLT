import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Navlogo from './Navlogo';
import { HeaderContent } from './HeaderContent';
import Breadcrumbs from './utiliti/breadcrumbs/Breadcrumbs';
import MarqueeUI from './MarqueeUI'

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const breadcrumbPages = []; 
  const isBreadcrumbPage = breadcrumbPages.includes(location.pathname);

  return (
    <div className='navbody'>
      
      <MarqueeUI />
      <Navlogo />
      <Navbar />
      {isHome ? (
        <HeaderContent isHome={isHome} />
      ) : (
        isBreadcrumbPage ? (
          <Breadcrumbs >
            <HeaderContent isHome={isHome} />
          </Breadcrumbs>
        ) : (
          <HeaderContent isHome={isHome} />
        )
      )}
    </div>
  );
};

export default Header;
