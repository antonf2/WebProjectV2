import { Navigate } from "react-router-dom";
import { Layout, isAuthenticated } from "./commonUsage";

export const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    <Layout>{element}</Layout>
  ) : (
    <Navigate to="/login" />
  );
};
