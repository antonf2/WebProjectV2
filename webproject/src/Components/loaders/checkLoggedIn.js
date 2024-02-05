import { redirect } from "react-router-dom";

export const CheckLoggedIn = () => {
  const userToken = localStorage.getItem("USER_TOKEN");
  if (userToken) {
    return redirect("/home");
  }
  return null;
};
