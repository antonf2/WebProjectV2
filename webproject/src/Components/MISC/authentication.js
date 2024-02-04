import { Navigate } from "react-router-dom";
import { Footer } from "../Shared/footer";
import { NavBar } from "../Shared/header";

export const isAuthenticated = () => {
  return localStorage.getItem("USER_TOKEN");
};

const Layout = ({ children }) => (
  <div>
    <NavBar />
    <div>{children}</div>
    <Footer />
  </div>
);

export const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    <Layout>{element}</Layout>
  ) : (
    <Navigate to="/login" />
  );
};
