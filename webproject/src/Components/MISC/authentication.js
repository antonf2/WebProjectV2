import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../Shared/header";
import { Footer } from "../Shared/footer";

const Layout = ({ children }) => (
  <div>
    <NavBar />
    <div>{children}</div>
    <Footer />
  </div>
);

export const PrivateRoute = ({ element }) => {
  const userToken = localStorage.getItem("USER_TOKEN");

  return userToken ? (
    <Layout>
      <Outlet />{" "}
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
