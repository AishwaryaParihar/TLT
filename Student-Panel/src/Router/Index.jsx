import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Pages/Login';
import SignUp from '../Pages/SingUp';
import Sidebar from '../Components/Sidebar';
import LeaderBoard from '../Components/LeaderBoard';
import StudentProfile from '../Components/StudentProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'SignUp',
        element: <SignUp />,
      },
      {
        path: 'sidebar',
        element: <Sidebar />,
        children: [
          {
            path: 'leaderboard',
            element: <LeaderBoard />,
          },
          {
            path: 'profile',
            element: <StudentProfile />,
          },
        ],
      },
    ],
  },
]);
