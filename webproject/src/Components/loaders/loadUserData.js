import jwtDecode from "jwt-decode";
import { GetUser } from "../API/userAPI";

export const loadUserData = async () => {
  const UserToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  try {
    const response = await GetUser(UserToken);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error getting users:", error);
    return error;
  }
};
