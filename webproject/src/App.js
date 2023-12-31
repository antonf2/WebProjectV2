import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Pages/login";
import { Register } from "./Components/Pages/register";
import { HomePage } from "./Components/Pages/home";
import { LoggedInHomePage } from "./Components/Pages/loggedInHome";
import { PrivateRoute } from "./Components/MISC/privateRoute";
import { FavoritesPage } from "./Components/Pages/favorites";
import { AboutUsPage } from "./Components/Pages/aboutUs";
import { ContactUsPage } from "./Components/Pages/contactUs";
import { UserProfilePage } from "./Components/Pages/userProfile";

export const App = () => {
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
