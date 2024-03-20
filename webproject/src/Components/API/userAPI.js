import axios from "axios";
import { projectId, token, url } from "../MISC/commonUsage";

export const GetUser = async (UserToken) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = await axios.get(
      `${url}/user/object/${projectId}/${UserToken.Email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error Getting user:", error);
    throw error;
  }
};

export const DeleteUser = async (email) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = await axios.delete(
      `${url}/user/object/${projectId}/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const EditUser = async (userData) => {
  try {
    console.log(userData.Password);
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = await axios.put(
      `${url}/user/${projectId}/${userData.oldEmail}`,
      {
        ProjectID: projectId,
        Email: userData.Email,
        Role: userData.Role,
        Name: userData.Name,
        ...(userData.Password ? { Password: userData.Password } : {}),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};

export const GetUsers = async () => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.get(`${url}/user/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const LoginUser = async (loginForm) => {
  try {
    const response = await axios.post(`${url}/login/${projectId}`, loginForm);

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem("USER_TOKEN", token);
      return response;
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error(
        "Invalid credentials. Please check your email and password."
      );
    } else {
      console.error("Error logging in:", error);
    }
    throw error;
  }
};

export const RegisterUser = async (registerForm) => {
  try {
    if (registerForm.Password === registerForm.ConfirmPassword) {
      const response = await axios.post(`${url}/user/`, registerForm);
      return response.data;
    } else alert("Passwords do not match, please try again.");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
