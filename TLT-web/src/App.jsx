

import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'; // Import useDispatch
import "./App.css";
import { Outlet } from "react-router-dom"; // Removed RouterProvider import
import { ToastContainer } from 'react-toastify';
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";
import Hambergur from "./component/content/Hambergur.jsx";
import Whatshap from "./component/whatsapp/Whatsapp.jsx";
import Telegram from "./component/telegram/Telegram.jsx";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
 

  return (
    <>
    <ChakraProvider>
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
      <Hambergur />
      <Telegram />
      <Whatshap />
      <Footer />
      </ChakraProvider>
      </>
  );
}

export default App;

