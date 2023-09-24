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
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<LoggedInHomePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/about" element={<AboutUsPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/contact" element={<ContactUsPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
