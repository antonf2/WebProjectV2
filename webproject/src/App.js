import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Pages/login";
import { Register } from "./Components/Pages/register";
import { HomePage } from "./Components/Pages/home";
import { LoggedInHomePage } from "./Components/Pages/loggedInHome";
import { FavoritesPage } from "./Components/Pages/favorites";
import { AboutUsPage } from "./Components/Pages/aboutUs";
import { ContactUsPage } from "./Components/Pages/contactUs";
import { UserProfilePage } from "./Components/Pages/userProfile";
import { PrivateRoute } from "./Components/MISC/authentication";
import { ErrorPage } from "./Components/Pages/error";
import { loadCardData } from "./Components/loaders/loadCardData";
import { CheckLoggedIn } from "./Components/loaders/checkLoggedIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: CheckLoggedIn,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: CheckLoggedIn,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
    loader: CheckLoggedIn,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/favorites",
        element: <FavoritesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/contact",
        element: <ContactUsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/home",
        element: <LoggedInHomePage />,
        errorElement: <ErrorPage />,
        loader: loadCardData,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
