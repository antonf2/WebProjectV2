import axios from "axios";
import { projectId, token, url, userToken } from "../MISC/commonUsage";

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
