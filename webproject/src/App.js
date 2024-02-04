import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Pages/login";
import { Register } from "./Components/Pages/register";
import { HomePage } from "./Components/Pages/home";
import { LoggedInHomePage } from "./Components/Pages/loggedInHome";
import { FavoritesPage } from "./Components/Pages/favorites";
import { AboutUsPage } from "./Components/Pages/aboutUs";
import { ContactUsPage } from "./Components/Pages/contactUs";
import { UserProfilePage } from "./Components/Pages/userProfile";
import { useEffect } from "react";
import {
  PrivateRoute,
  isAuthenticated,
} from "./Components/MISC/authentication";
import { ErrorPage } from "./Components/Pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <PrivateRoute element={<LoggedInHomePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/favorites",
    element: <PrivateRoute element={<FavoritesPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <PrivateRoute element={<ContactUsPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<UserProfilePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <PrivateRoute element={<AboutUsPage />} />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isAuthenticated()) {
        clearInterval(intervalId);
        window.location.href = "/login"; //
      }
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
