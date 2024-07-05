import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Input from './Components/auth/Input.jsx';
import DisplayDetails from './Components/auth/Details.jsx';
import Start from './Components/auth/Start.jsx';
import SignIn from './Components/auth/SignIn.jsx';
import SignUp from './Components/auth/SignUp.jsx';
import Squat from './Components/Frontend/exercise/Squats.jsx';
import Pushup from './Components/Frontend/exercise/Pushup.jsx';
import Pullups from './Components/Frontend/exercise/Pullup.jsx';
import Plank from './Components/Frontend/exercise/Plank.jsx';
import Lunges from './Components/Frontend/exercise/Lunges.jsx';
import Legraises from './Components/Frontend/exercise/Legraises.jsx';
import Legcurls from './Components/Frontend/exercise/Legcurls.jsx';
import CobraStretch from './Components/Frontend/exercise/Cobrastretch.jsx';
import Butterfly from './Components/Frontend/exercise/Butterfly.jsx';
import Bicepcurls from './Components/Frontend/exercise/Bicepcurls.jsx';
import Benchpress from './Components/Frontend/exercise/Benchpress.jsx';
import Abdo from './Components/Frontend/exercise/Abdominalcrunch.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/input",
    element: <Input />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/exercise/squats",
    element: <Squat />,
  },
  {
    path: "/exercise/push-up",
    element: <Pushup />,
  },
  {
    path: "/exercise/pull-ups",
    element: <Pullups />,
  },
  {
    path: "/exercise/plank",
    element: <Plank />,
  },
  {
    path: "/exercise/lunges",
    element: <Lunges />,
  },
  {
    path: "/exercise/leg-raises",
    element: <Legraises />,
  },
  {
    path: "/exercise/leg-curls",
    element: <Legcurls />,
  },
  {
    path: "/exercise/cobra-stretch",
    element: <CobraStretch />,
  },
  {
    path: "/exercise/butterfly",
    element: <Butterfly />,
  },
  {
    path: "/exercise/bicep-curls",
    element: <Bicepcurls />,
  },
  {
    path: "/exercise/benchpress",
    element: <Benchpress />,
  },
  {
    path: "/exercise/Abdominal-crunch",
    element: <Abdo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
