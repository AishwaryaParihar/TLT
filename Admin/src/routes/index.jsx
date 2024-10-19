import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Sidebar from '../components/Sidebar';
import SignUp from '../pages/SignUp';
import User from '../components/User';
import MpcjData from '../components/MpcjData';
import TpmData from '../components/TpmData';
import InfoMarquee from '../components/InfoMarquee';
import Notification from '../components/Notification';
import UpdateMarquee from '../components/UpdateMarquee';
import Prevyearpaperpdf from '../components/Prevyearpaperpdf';
import Dashboard from '../components/Dashboard';
import Unpaid from '../components/Unpaid';
import EmpowermentAdmin from '../components/EmpowermentAdmin';
import FastTrackForm from '../components/FastTrackForm';
import SyllabusUpload from '../components/SyllabusUpload';
import JetFormDetails from '../components/JetFormDetails';
import PreviousYearForm from '../components/PreviousYearForm';
import Header from '../components/Header';
import Quiz from '../components/Quiz';
import QuizUserForm from '../components/QuizUserForm';
import AddMpcjProduct from '../components/AddMpcjProduct';
import UnpaidModal from '../components/Unpaidmodel';
import Syllabusmodel from '../components/Syllabusmodel';
import EnquiryAdd from '../components/EnquiryAdd';
import EnquiryList from '../components/EnquiryList';
import ProfilePage from '../components/StudentProfile';
import StudentProfile from '../components/StudentProfile';
import LeaderBoard from '../components/LeaderBoard';
import LeaderboardUpload from '../components/LeaderboardUpload';
import StudentList from '../components/StudentList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },

      {
        path: 'dashboard',
        element: <Sidebar />,
        children: [
          {
            path: 'dashboardcards',
            element: <Dashboard />,
          },
          {
            path: ':id',
            element: <StudentProfile />,
          },

          {
            path: 'header',
            element: <Header />,
          },
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'py-paper',
            element: <PreviousYearForm />,
          },
          {
            path: 'mpcj-form',
            element: <MpcjData />,
          },
          {
            path: 'tpm-form',
            element: <TpmData />,
          },
          {
            path: 'info-marquee',
            element: <InfoMarquee />,
          },
          {
            path: 'notification',
            element: <Notification />,
          },
          {
            path: 'update-headline',
            element: <UpdateMarquee />,
          },
          {
            path: 'Prevyearpaperpdf',
            element: <Prevyearpaperpdf />,
          },
          {
            path: 'quiz-questions',
            element: <Quiz />,
          },
          {
            path: 'UnpaidModal',
            element: <UnpaidModal />,
          },
          {
            path: 'Syllabusmodel',
            element: <Syllabusmodel />,
          },
          {
            path: 'quiz-user',
            element: <QuizUserForm />,
          },
          {
            path: 'Unpaid',
            element: <Unpaid />,
          },
          {
            path: 'EmpowermentAdmin',
            element: <EmpowermentAdmin />,
          },
          {
            path: 'FastTrackForm',
            element: <FastTrackForm />,
          },

          {
            path: 'SyllabusUpload',
            element: <SyllabusUpload />,
          },
          {
            path: 'jetformdetail',
            element: <JetFormDetails />,
          },
          {
            path: 'addMpcjProduct',
            element: <AddMpcjProduct />,
          },
          {
            path: 'addEnquiry',
            element: <EnquiryAdd />,
          },
          {
            path: 'enquiryList',
            element: <EnquiryList />,
          },
          {
            path: 'LeaderBoard',
            element: <LeaderBoard />,
          },
          {
            path: 'LeaderboardUpload',
            element: <LeaderboardUpload />,
          },
          {
            path: 'studentList',
            element: <StudentList />,
          },
        ]
      },
      {
        path: 'subAdminDashboard',
        element: <Sidebar />,
        children: [
          {
            path: 'dashboardcards',
            element: <Dashboard />,
          },
          {
            path: ':id',
            element: <StudentProfile />,
          },

          {
            path: 'header',
            element: <Header />,
          },
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'py-paper',
            element: <PreviousYearForm />,
          },
          {
            path: 'mpcj-form',
            element: <MpcjData />,
          },
          {
            path: 'tpm-form',
            element: <TpmData />,
          },
          {
            path: 'info-marquee',
            element: <InfoMarquee />,
          },
          {
            path: 'notification',
            element: <Notification />,
          },
          {
            path: 'update-headline',
            element: <UpdateMarquee />,
          },
          {
            path: 'Prevyearpaperpdf',
            element: <Prevyearpaperpdf />,
          },
          {
            path: 'quiz-questions',
            element: <Quiz />,
          },
          {
            path: 'UnpaidModal',
            element: <UnpaidModal />,
          },
          {
            path: 'Syllabusmodel',
            element: <Syllabusmodel />,
          },
          {
            path: 'quiz-user',
            element: <QuizUserForm />,
          },
          {
            path: 'Unpaid',
            element: <Unpaid />,
          },
          {
            path: 'EmpowermentAdmin',
            element: <EmpowermentAdmin />,
          },
          {
            path: 'FastTrackForm',
            element: <FastTrackForm />,
          },

          {
            path: 'SyllabusUpload',
            element: <SyllabusUpload />,
          },
          {
            path: 'jetformdetail',
            element: <JetFormDetails />,
          },
          {
            path: 'addMpcjProduct',
            element: <AddMpcjProduct />,
          },
          {
            path: 'addEnquiry',
            element: <EnquiryAdd />,
          },
          {
            path: 'enquiryList',
            element: <EnquiryList />,
          },
          {
            path: 'LeaderBoard',
            element: <LeaderBoard />,
          },
          {
            path: 'LeaderboardUpload',
            element: <LeaderboardUpload />,
          },
          {
            path: 'studentList',
            element: <StudentList />,
          },
        ]
      },
    ],
  },
]);
