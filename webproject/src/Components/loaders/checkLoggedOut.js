import { redirect } from "react-router-dom";

export const CheckLoggedOut = () => {
  const userToken = localStorage.getItem("USER_TOKEN");
  if (!userToken) {
    return redirect("/login");
  }
  return null;
};
