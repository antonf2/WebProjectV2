import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { NavBar } from "./Components/Shared/header";
import { Footer } from "./Components/Shared/footer";

const isAuthenticated = () => {
  return localStorage.getItem("USER_TOKEN") !== null;
};
const Layout = ({ children }) => (
  <div>
    <NavBar />
    <div>{children}</div>
    <Footer />
  </div>
);

const PrivateRoute = ({ element }) => {
  console.log("Checking authentication...");
  console.log("Stored token:", localStorage.getItem("USER_TOKEN"));
  console.log("Rendering element:", { element });
  return isAuthenticated() ? (
    <>
      <Layout>{element}</Layout>
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<LoggedInHomePage />} />}
          />
          <Route
            path="/favorites"
            element={<PrivateRoute element={<FavoritesPage />} />}
          />
          <Route
            path="/about"
            element={<PrivateRoute element={<AboutUsPage />} />}
          />
          <Route
            path="/contact"
            element={<PrivateRoute element={<ContactUsPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<UserProfilePage />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
