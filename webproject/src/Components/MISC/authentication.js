import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { NavBar } from "../Shared/header";
import { Footer } from "../Shared/footer";
import jwtDecode from "jwt-decode";

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex-1 relative router-div-css">{children}</div>
    <Footer />
  </div>
);

export const PrivateRoute = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";
  const userToken = localStorage.getItem("USER_TOKEN");

  return userToken ? (
    <div id="detail" className={isLoading ? "loading" : ""}>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export const IsOwner = (element) => {
  const userToken = localStorage.getItem("USER_TOKEN");
  const decodedToken = jwtDecode(userToken);
  if (decodedToken.Role === "Admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/home" />;
  }
};
