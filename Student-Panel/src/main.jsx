import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Index.jsx';
import { UserProvider } from './Components/COntext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <RouterProvider router={router} /></UserProvider>
  </StrictMode>
);
