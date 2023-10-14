import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';

import Landing from './pages/Landing';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SignupPokemon from './pages/SignupPokemon';
import SignupAvatar from './pages/SignupAvatar';
import Home from './pages/Home'
import Search from './pages/Search';
import Shop from './pages/Shop';
import Arena from './pages/Arena'
import Opponent from './pages/Opponent';
import Battle from './pages/Battle';
import Logout from './pages/Logout';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: "",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "Profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "Search",
    element: <Search />,
    errorElement: <ErrorPage />
  },
  {
    path: "Shop",
    element: <Shop />,
    errorElement: <ErrorPage />
  },
  {
    path: "Arena",
    element: <Arena />,
    errorElement: <ErrorPage />
  },
  {
    path: "Opponent",
    element: <Opponent />,
    errorElement: <ErrorPage />
  },
  {
    path: "Battle",
    element: <Battle />,
    errorElement: <ErrorPage />
  },
  {
    path: "logout",
    element: <Logout />,
    errorElement: <ErrorPage />
  },
  {
    path: "home",
    element: <Home/>,
    errorElement: <ErrorPage />
  },
  {
    path: "signup/pokemon",
    element: <SignupPokemon />,
    errorElement: <ErrorPage />
  },
  {
    path: "signup/avatar",
    element: <SignupAvatar />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
