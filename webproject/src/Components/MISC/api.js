import axios from "axios";
import { projectId, token, url, userToken } from "./commonUsage";
export const GetUser = async (email) => {
  await axios
    .get(`${url}/user/object/${projectId}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error Getting user:", error);
    });
};

export const DeleteUser = async (email) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.delete(`${url}/user/object/${projectId}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const EditUser = async (email, password, name, role) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.put(
      `${url}/user/object/${projectId}/${email}`,
      {
        ProjectID: { projectId },
        Email: email,
        Password: password,
        Role: role,
        Name: name,
        // Favorites: favorites,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
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
    return response.data;
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

export const GetCards = async () => {
  try {
    const response = await axios.get(`${url}/item/${projectId}_BusinessCard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting cards:", error);
    throw error;
  }
};

export const AddCard = async (cardData) => {
  var uploaddata = {
    Scope: "Public",
    Data: cardData,
  };
  try {
    if (!token) {
      throw new Error(`User token not found in localStorage.token:${token}`);
    }
    const response = axios.post(
      `${url}/item/${projectId}_BusinessCard`,
      uploaddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
};

export const GetFavoriteCards = async (user) => {
  try {
    const response = await axios.get(`${url}/item/${projectId}_${user}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
};

export const AddFavoriteCard = async (CardID, user) => {
  var uploaddata = {
    Scope: "Public",
    Data: { CardID },
  };
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const existingItemsResponse = await axios.get(
      `${url}/item/${projectId}_${user}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const existingItems = existingItemsResponse.data;
    const isDuplicate = existingItems.some(
      (item) => item.Data.CardID === CardID
    );
    if (isDuplicate) {
      console.log("Item with the same value already exists. Not adding.");
      // You can return the existing item or handle it as needed.
      return;
    }
    const response = axios.post(
      `${url}/item/${projectId}_${user}/`,
      uploaddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite card:", error);
    throw error;
  }
};
export const DeleteFavoriteCard = async (itemId) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.delete(
      `${url}/item/${projectId}_UserFavorites/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite card:", error);
    throw error;
  }
};

export const DeleteCard = async (itemId) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.delete(
      `${url}/item//${projectId}_BusinessCard/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const EditCard = async (cardData) => {
  var cardDataWithUser = {
    ...cardData,
    createdBy: userToken ? userToken.Email : null,
  };
  var uploaddata = {
    Scope: "Public",
    Data: cardDataWithUser,
  };
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.put(
      `${url}/item/${projectId}_BusinessCard`,
      uploaddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing card:", error);
    throw error;
  }
};

export const GetCard = (itemId) => {
  try {
    if (!token) {
      throw new Error("User token not found in localStorage.");
    }
    const response = axios.get(
      `${url}/item/${projectId}_BusinessCard/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting cards:", error);
    throw error;
  }
};
